import truncate from "lodash/truncate";

export function excerpt(string) {
    return truncate(string, {
        length: 400, // maximum 400 characters
        separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
    });
}

export function buildYoutubeTrailerSearchUrl(title, releaseDate) {
    const year = (releaseDate || "").slice(0, 4);
    const query = `${title || "movie"} ${year} official trailer`.trim();
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export function getPosterFallbackDataUri(title = "Movie") {
    const safeTitle = (title || "Movie").slice(0, 30);
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1a2136"/>
          <stop offset="100%" stop-color="#121825"/>
        </linearGradient>
      </defs>
      <rect width="500" height="750" fill="url(#bg)"/>
      <circle cx="410" cy="120" r="110" fill="#ff4e64" fill-opacity="0.18"/>
      <circle cx="80" cy="650" r="120" fill="#6f58ff" fill-opacity="0.14"/>
      <rect x="46" y="46" width="408" height="658" rx="22" fill="none" stroke="#ffffff" stroke-opacity="0.14"/>
      <text x="50%" y="47%" text-anchor="middle" fill="#f3f7ff" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="700">Poster Not Found</text>
      <text x="50%" y="55%" text-anchor="middle" fill="#b4bfd6" font-family="Segoe UI, Arial, sans-serif" font-size="24">${safeTitle}</text>
      <text x="50%" y="91%" text-anchor="middle" fill="#8892ab" font-family="Segoe UI, Arial, sans-serif" font-size="18">AuraCinemaX</text>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function buildFallbackReviews(movie) {
    const rating = Number(movie.vote_average || 0);
    const votes = Number(movie.vote_count || 0);

    let sentiment = "mixed";
    if (rating >= 8) sentiment = "very positive";
    else if (rating >= 7) sentiment = "positive";
    else if (rating >= 6) sentiment = "slightly positive";
    else if (rating >= 5) sentiment = "neutral";
    else sentiment = "negative";

    const confidence =
        votes >= 10000 ? "very high" :
            votes >= 2500 ? "high" :
                votes >= 500 ? "medium" : "limited";

    return [
        {
            id: `audience-pulse-${movie.id}`,
            author: "Audience Pulse (TMDB Data)",
            content: `Audience sentiment for "${movie.title}" is ${sentiment}. Current score: ${rating.toFixed(1)}/10 from ${votes.toLocaleString()} votes (confidence: ${confidence}). This summary is generated from rating data, not from written audience comments.`,
        },
    ];
}

const GENRE_BUDGET_MULTIPLIERS = {
    action: 1.85,
    adventure: 1.6,
    fantasy: 1.55,
    "science fiction": 1.7,
    animation: 1.35,
    thriller: 1.05,
    crime: 0.95,
    mystery: 0.9,
    drama: 0.8,
    romance: 0.7,
    comedy: 0.75,
    family: 0.85,
    horror: 0.6,
    documentary: 0.25,
    history: 0.95,
    war: 1.1,
    western: 0.85,
    music: 0.7,
    tvmovie: 0.45,
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function estimateMovieBudget(movie = {}) {
    const runtime = Number(movie.runtime || 0);
    const popularity = Number(movie.popularity || 0);
    const voteCount = Number(movie.vote_count || 0);
    const year = Number((movie.release_date || "").slice(0, 4));
    const genres = Array.isArray(movie.genres) ? movie.genres : [];

    const runtimeFactor = clamp(runtime > 0 ? runtime / 110 : 1, 0.7, 1.8);
    const popularityFactor = clamp(Math.log10(popularity + 10) / 1.2, 0.75, 1.8);
    const voteFactor = clamp(Math.log10(voteCount + 20) / 2.6, 0.75, 1.7);
    const yearFactor = Number.isFinite(year) ? clamp(0.65 + (year - 1980) * 0.012, 0.55, 1.25) : 1;

    const genreFactor =
        genres.length > 0
            ? genres.reduce((sum, genre) => {
                  const key = String(genre?.name || "").toLowerCase().replace(/\s+/g, " ").trim();
                  const normalized = key === "tv movie" ? "tvmovie" : key;
                  return sum + (GENRE_BUDGET_MULTIPLIERS[normalized] || 1);
              }, 0) / genres.length
            : 1;

    const baseBudget = 14_000_000;
    const estimated = Math.round(
        clamp(
            baseBudget * runtimeFactor * popularityFactor * voteFactor * yearFactor * genreFactor,
            2_000_000,
            320_000_000
        )
    );

    const signalCount = [
        runtime > 0,
        popularity > 0,
        voteCount > 0,
        Number.isFinite(year),
        genres.length > 0,
    ].filter(Boolean).length;
    const confidence = signalCount >= 4 ? "medium" : "low";

    return { amount: estimated, confidence };
}

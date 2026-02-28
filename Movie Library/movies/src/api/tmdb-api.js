const API_BASE = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_KEY;
const CACHE_PREFIX = "tmdb-cache:";
const DEFAULT_TTL = 1000 * 60 * 20;
const REQUEST_TIMEOUT_MS = 10000;

const memoryCache = new Map();
const inFlight = new Map();

const buildUrl = (path, params = {}) => {
  const url = new URL(`${API_BASE}/${path}`);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
};

const getStoredCache = (key) => {
  const cachedInMemory = memoryCache.get(key);
  if (cachedInMemory) return cachedInMemory;

  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    memoryCache.set(key, parsed);
    return parsed;
  } catch {
    return null;
  }
};

const setStoredCache = (key, payload) => {
  memoryCache.set(key, payload);
  try {
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(payload));
  } catch {
    // Ignore storage quota errors
  }
};

const fetchJsonCached = async (url, ttlMs = DEFAULT_TTL) => {
  const key = url;
  const now = Date.now();
  const cached = getStoredCache(key);

  if (cached && now - cached.ts < ttlMs) {
    return cached.data;
  }

  if (inFlight.has(key)) {
    return inFlight.get(key);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const requestPromise = fetch(url, { signal: controller.signal })
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.status_message || "Something went wrong");
      }
      return response.json();
    })
    .then((data) => {
      setStoredCache(key, { ts: Date.now(), data });
      return data;
    })
    .catch((error) => {
      const stale = getStoredCache(key);
      if (stale) return stale.data;
      throw error;
    })
    .finally(() => {
      clearTimeout(timeout);
      inFlight.delete(key);
    });

  inFlight.set(key, requestPromise);
  return requestPromise;
};

export const getMovies = ({ queryKey }) => {
  const [, { pageNumber }] = queryKey;
  const url = buildUrl("discover/movie", {
    language: "en-US",
    include_adult: false,
    include_video: false,
    page: pageNumber,
  });
  return fetchJsonCached(url);
};

export const getMoviesByLanguage = ({ queryKey }) => {
  const [, { language }, { pageNumber }] = queryKey;
  const url = buildUrl("discover/movie", {
    language: "en-US",
    include_adult: false,
    include_video: false,
    with_original_language: language,
    sort_by: "popularity.desc",
    page: pageNumber,
  });
  return fetchJsonCached(url);
};

export const getPopularPeople = ({ queryKey }) => {
  const [, { pageNumber }] = queryKey;
  const url = buildUrl("person/popular", {
    language: "en-US",
    include_adult: false,
    include_video: false,
    page: pageNumber,
  });
  return fetchJsonCached(url);
};

export const getLatestMovie = () => {
  const url = buildUrl("movie/latest");
  return fetchJsonCached(url);
};

export const getUpcomingMovies = ({ queryKey }) => {
  const [, { pageNumber }] = queryKey;
  const url = buildUrl("movie/upcoming", { language: "en-US", page: pageNumber });
  return fetchJsonCached(url);
};

export const getTrendingTodayMovies = ({ queryKey }) => {
  const [, { pageNumber }] = queryKey;
  const url = buildUrl("trending/movie/day", { language: "en-US", page: pageNumber });
  return fetchJsonCached(url);
};

export const getPlayingMovies = ({ queryKey }) => {
  const [, { pageNumber }] = queryKey;
  const url = buildUrl("movie/now_playing", { language: "en-US", page: pageNumber });
  return fetchJsonCached(url);
};

export const getClassicMovies = ({ queryKey }) => {
  const [, { pageNumber }] = queryKey;
  const url = buildUrl("discover/movie", {
    language: "en-US",
    include_adult: false,
    include_video: false,
    page: pageNumber,
    "primary_release_date.lte": "1999-12-31",
    sort_by: "vote_average.desc",
    "vote_count.gte": 1200,
  });
  return fetchJsonCached(url);
};

export const getNewMovies = ({ queryKey }) => {
  const [, { pageNumber }] = queryKey;
  const currentYear = new Date().getFullYear();
  const url = buildUrl("discover/movie", {
    language: "en-US",
    include_adult: false,
    include_video: false,
    page: pageNumber,
    "primary_release_date.gte": `${currentYear}-01-01`,
    sort_by: "popularity.desc",
  });
  return fetchJsonCached(url);
};

export const getMovie = ({ queryKey }) => {
  const [, { id }] = queryKey;
  const url = buildUrl(`movie/${id}`);
  return fetchJsonCached(url);
};

export const getPerson = ({ queryKey }) => {
  const [, { id }] = queryKey;
  const url = buildUrl(`person/${id}`);
  return fetchJsonCached(url);
};

export const getGenres = () => {
  const url = buildUrl("genre/movie/list", { language: "en-US" });
  return fetchJsonCached(url, 1000 * 60 * 60 * 24);
};

export const getMovieImages = ({ queryKey }) => {
  const [, { id }] = queryKey;
  const url = buildUrl(`movie/${id}/images`);
  return fetchJsonCached(url);
};

export const searchForMovies = ({ queryKey }) => {
  const [, { title }, { pageNumber }] = queryKey;
  const url = buildUrl("search/movie", {
    query: title,
    page: pageNumber,
  });
  return fetchJsonCached(url);
};

export const getMovieReviews = ({ queryKey }) => {
  const [, { id }] = queryKey;
  const url = buildUrl(`movie/${id}/reviews`);
  return fetchJsonCached(url);
};

export const getMovieVideos = ({ queryKey }) => {
  const [, { id }] = queryKey;
  const url = buildUrl(`movie/${id}/videos`, { language: "en-US" });
  return fetchJsonCached(url);
};

export const getMovieCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;
  const url = buildUrl(`movie/${id}/credits`);
  return fetchJsonCached(url);
};

export const getMovieCreditsForPerson = ({ queryKey }) => {
  const [, { id }] = queryKey;
  const url = buildUrl(`person/${id}/movie_credits`);
  return fetchJsonCached(url);
};

export const getSimilarMovies = ({ queryKey }) => {
  const [, { id }] = queryKey;
  const url = buildUrl(`movie/${id}/similar`);
  return fetchJsonCached(url);
};

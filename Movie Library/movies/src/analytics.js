const MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;
const isProd = process.env.NODE_ENV === "production";
const isEnabled = Boolean(MEASUREMENT_ID) && isProd;

let initialized = false;

const loadGoogleAnalytics = () => {
  if (!isEnabled || initialized || typeof window === "undefined") return;

  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}"]`)) {
    initialized = true;
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: false,
  });

  initialized = true;
};

export const trackPageView = (path) => {
  if (!path) return;
  loadGoogleAnalytics();
  if (!isEnabled || typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};

export const isAnalyticsEnabled = () => isEnabled;

// Static Settings for OPDS-Proxy Frontend
export default {
    DEBUG: (process.env.NODE_ENV === 'production' ? true : false),

    // Application settings
    APP_LOCALE: 'de',
    APP_FALLBACK_LOCALE: 'en',
    APP_UPDATE_INTERVAL: 3000,
    APP_OPDS_HOST: window.location.host,
    APP_OPDS_PATH: '/opds',
    APP_TOOLTIP_TIMEOUT: 3000,

    // API settings
    API_REQUEST_TIMEOUT: 3000,

    // Scrapyd API settings
    SCRAPYD_JOB_PAGESIZE: 10,
    SCRAPYD_HOST: 'http://localhost:6800',
    SCRAPYD_POST_CONTENT_TYPE: 'application/x-www-form-urlencoded'
}

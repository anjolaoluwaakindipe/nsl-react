const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/isslapi", {
            target: "http://api.issl.ng:7777", // API endpoint 1
            changeOrigin: true,
            pathRewrite: {
                "^/isslapi": "",
            },
            headers: {
                Connection: "keep-alive",
            },
        })
    );
    app.use(
        createProxyMiddleware("/sentryapi", {
            target: "https://sentry.issl.ng", // API endpoint 1
            changeOrigin: true,
            pathRewrite: {
                "^/sentryapi": "",
            },
            headers: {
                Connection: "keep-alive",
            },
        })
    );
};

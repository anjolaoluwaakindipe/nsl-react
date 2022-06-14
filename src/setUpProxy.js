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
};

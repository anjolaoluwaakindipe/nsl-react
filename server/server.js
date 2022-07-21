const express = require("express");
const path = require("path");
const { NODE_PORT } = require("./environments");
const cors = require("cors");
const {
    createProxyMiddleware,
    fixRequestBody,
} = require("http-proxy-middleware");

const app = express();
const root = path.join(__dirname, "../build");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(
    "/isslapi/**",
    createProxyMiddleware({
        target: "http://api.issl.ng:7777",
        pathRewrite: {
            "^/isslapi": "",
        },
        onProxyReq: fixRequestBody,
        changeOrigin: true,
        headers: {
            Connection: "keep-alive",
        },
    })
);
app.use(
    "/sentryapi/**",
    createProxyMiddleware({
        target: "https://sentry.issl.ng",
        onProxyReq: fixRequestBody,
        pathRewrite: {
            "^/sentryapi": "",
        },
        changeOrigin: true,
        headers: {
            Connection: "keep-alive",
        },
    })
);

app.use(express.static(path.join(__dirname, "../build")));

console.log(path.join(__dirname, "../build"));

app.get(
    "/*",
    function (req, res, next) {
        req.url = req.url + ".gz";
        res.set("Content-Encoding", "gzip");
        next();
    },
    (req, res) => {
        res.sendFile("index.html", { root });
    }
);

app.listen(NODE_PORT, () => {
    console.log("server starting on port: ", NODE_PORT);
});

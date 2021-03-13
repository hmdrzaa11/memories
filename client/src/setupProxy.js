const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    ["/api", "/images"],
    createProxyMiddleware({ target: "http://localhost:8000" })
  );
};

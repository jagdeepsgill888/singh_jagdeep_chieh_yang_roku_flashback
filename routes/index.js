const express = require('express');
const router = express.Router();

// This is where we would add our middleware
const { createProxyMiddleware } = require('http-proxy-middleware');

router.use('/api', createProxyMiddleware({
    target: 'http://localhost:5000',
    headers: {
        accept: 'application/json, application/x-www-form-urlencoded'
    },
    changeOrigin: true
}))

router.get('/', (req, res) => {
    res.render('index', { message: "Hello from handlebars!"});
})

router.get('/portfolio', (req, res) => {
    res.render('artwork', {portmessage: "You're on the portfolio page"});
})

module.exports = router;
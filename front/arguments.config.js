module.exports = {
    env: (process.env.NODE_ENV == 'development'),
    PORT: 8080,
    fileServerAddress: 'http://localhost:22022',
    nosqlServerAddress: 'http://localhost:1234'
}
module.exports = {
    // Secret key for JWT signing and encryption
    'secret': 'super secret passphrase',
    // Database connection information
    // 'database': 'mongodb://localhost:27017/slack',
    'database': 'mongodb://i7salas:i7salas@ds139322.mlab.com:39322/slackclonedb',
    // Setting port for server
    'port': process.env.PORT || 3000
}
import packageJson from '../../package.json'

export default {
    app: {
        name: packageJson.name,
        version: packageJson.version
    },

    db: {
        url: process.env.DB_URL || 'mongodb://localhost/notification'
    },

    server: {
        port: process.env.PORT || 8084
    },

    google: {
        apiKey : process.env.GOOGLE_API_KEY || 'AIzaSyDbG-S5qctvRfRgMKfbW0noYAK8GgybRSg',
        apiUrl : process.env.GOOGLE_API_URL || 'https://maps.googleapis.com/maps/api/geocode/json'
    }
}

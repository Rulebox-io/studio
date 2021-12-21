const fs = require('fs')

module.exports = {
    devServer: process.env.NODE_ENV === 'production' ? { }
      : {
        https: {
          key: fs.readFileSync('../harnessdata.io+3-key.pem'),
          cert: fs.readFileSync('../harnessdata.io+3.pem'),
        },
        public: 'https://harnessdata.io:8380/',
        disableHostCheck: true
    }
}
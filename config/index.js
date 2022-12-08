const dotenv = require('dotenv')

dotenv.config({ path: './.env' });
const config = {
    db: {
      url: `${process.env.DB_URL.replace('<password>',
      process.env.DB_PASSWORD)}`
    }
  }

module.exports = config
const cors = require('cors');

module.exports = function (server) {
  server.use(cors());
};

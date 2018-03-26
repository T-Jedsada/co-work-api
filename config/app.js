require('dotenv').config();
var mongojs = require('mongojs');

/*function config() {
    return mongojs(process.env.CONFIG_DATABASE);
}*/

module.exports = {
    config: function () {
        return mongojs(process.env.CONFIG_DATABASE);
    }
};
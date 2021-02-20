global.ENV = function(env) {
    global._ENV = env;
}

global.getEnv = function() {
    const environements = require('./dms.json');
    const env = environements.envs[_ENV || "dev"];
    return env;
}

module.export = {};
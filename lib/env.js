global.ENV = function(env) {
    global._ENV = env;
}

global.getEnv = function() {
    return _ENV;
}

module.export = {};
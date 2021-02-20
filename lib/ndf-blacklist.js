const axios = require('axios');
const _ = require('lodash');

global.NDF_BLACKLIST = async function(propertyKey, isBlacklisted) {
    try {
        if (isBlacklisted) {
            await axios.put(`${getEnv()}/internal/datamodelAT/properties/blacklisted/ndfonly/${propertyKey}`)
        } else {
            const x = await axios.delete(`${getEnv()}/internal/datamodelAT/properties/blacklisted/ndfonly/${propertyKey}`)
        }
    } catch(e) {
        console.log(e);
    }
};

module.export = {};
global.ALL_ORGA = async function() {
    const env = require('./env')[getEnv()];
    const axios = require('axios');
    return (await axios.get(`${env}/internal/organizations/`)).data.map(o => o.organizationCode);
}

module.export = {};
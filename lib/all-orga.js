const axios = require('axios');

global.ALL_ORGA = async function() {
    return (await axios.get(`${getEnv()}/internal/organizations/`)).data.map(o => o.organizationCode);
}

module.export = {};
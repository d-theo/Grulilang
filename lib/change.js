const axios = require('axios');

global.CHANGE = async function(orga, pk, field, value) {
    const environements = require('./dms.json');
    const env = environements.envs[getEnv()];
    let prop = (await axios.get(`${env}/internal/properties/${orga}/${pk}`)).data;
    prop[field] = value;
    try {
        await axios.put(`${env}/internal/properties/${orga}/${pk}`, prop, {headers: {'power-code':'TataYoyoKesCeKiaSouTonGrandChapO'}});
    } catch(err) {
        //console.log(err)
    }
}

module.export = {};
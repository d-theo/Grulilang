const axios = require('axios');
const _ = require('lodash');

global.CHANGE = async function(orga, pk, field, value) {
    let prop = (await axios.get(`${getEnv()}/internal/properties/${orga}/${pk}`)).data;
    _.set(prop, field, value);
    await axios.put(`${getEnv()}/internal/properties/${orga}/${pk}`, prop, {headers: {'power-code':'TataYoyoKesCeKiaSouTonGrandChapO'}});
}

module.export = {};
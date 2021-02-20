const axios = require('axios');
const _ = require('lodash');

global.AT_CHANGE = async function(isAllOrga, orga, pk, field, value) {
    if (arguments.length != 5) {
        throw new Error('AT_CHANGE(isAllOrga, orga, propertyKey, field, value)')
    }
    const environements = require('./dms.json');
    const env = environements.envs[getEnv()];
    let req = createBaseRequest(isAllOrga, orga, pk);
    if (field === 'status') {
        req.status = value;
        await axios.patch(`${env}/internal/datamodelAT/properties/status`, req);
    } else if (field === 'rule') {
        req.status = value;
        await axios.patch(`${env}internal/datamodelAT/properties/rule`, req);
    } else {
        _.set(req, `changes.${field}`, value);
        await axios.patch(`${env}/internal/datamodelAT/properties`, req);
    }
}

function createBaseRequest(isAllOrga, orgas, pk) {
    return {
        "propertyKeys": [pk],
        "organizationCodes": orgas,
        "changeInATDatamodel": true,
        "allOrgas": isAllOrga,
    }
}

module.export = {};
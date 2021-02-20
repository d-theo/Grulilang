const axios = require('axios');

global.NOTIFY_UPDATE = async function(orgas, pks) {
    const req = {
        "propertyKeys": pks,
        "organizationCodes": orgas
    };
    await axios.post(`${getEnv()}/internal/datamodelAT/notifications/multiupdate`,req);
}

global.NOTIFY_CREATION = async function(orga, pk) {
    const req = {
        "organizationCode": orga,
        "propertyKey": pk
    };
    await axios.post(`${getEnv()}/internal/datamodelAT/notifications/propertycreation`, req);
}
module.export = {};
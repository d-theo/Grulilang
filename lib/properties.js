global.PROPERTIES = async function() {
    return (await axios.get(`${getEnv()}/internal/organizations/`)).data.map(o => o.organizationCode);
}

module.export = {};
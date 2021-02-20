require('./lib/index');

async function main() {
	await ENV("dev")
for (const orga of (await ALL_ORGA())) {
            await NOTIFY_UPDATE(orga,"test")
    }
}
    main();
    
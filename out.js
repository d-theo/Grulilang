require('./lib/index');

async function main() {
	(await ENV("dev"))
for (const orga of (await ALL_ORGA())) {
            for (const property of ["src_1"]) {
            (await CHANGE(orga,property,"rule",(await JSON("./rule.json"))))
    }
    }
}
    main();
    
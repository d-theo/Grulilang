require('./lib/index');
async function main() {
	for (let orga of ["ATI","ATIDEMO"]) {
            for (let property of ["src_1"]) {
            (await CHANGE(orga,property,"name.fr","ma nouvelle description"))
    }
    }
}
    main();
    
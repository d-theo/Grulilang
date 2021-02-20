const fs = require('fs');
const execSync = require('child_process').execSync;

const visitor = require('./core/compiler');
const tokenizer = require('./core/tokenize');
const parser = require('./core/parser');

const mode = ' DEBUG'

if (process.argv.length !== 3) {
    console.log('usage : node grulilang.js myfile');
    process.exit(0);
}

print('---- get source file ----');
const pgrm = fs.readFileSync(process.argv[2]).toString();
print(pgrm);
print('---- tokenize ----');
const tokens = tokenizer.tokenize_prgm(pgrm);
print(JSON.stringify(tokens));
print('---- Transforming to AST ----');
const ast = parser.parse(tokens);
print(JSON.stringify(ast, " "));
print('---- Compiling to Javascript ----');
const compiled = visitor.visitNodes(ast);
print(compiled);

print('---- Adding DM Libraries ----');
const lib = `require('./lib/index');\n\n`;

print('---- Writing to file ----');
fs.writeFileSync('./out.js', lib+compiled);

function print(any) {
    if (mode == 'DEBUG') {
        console.log(any);
    }
}
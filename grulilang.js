const fs = require('fs');
const execSync = require('child_process').execSync;

const visitor = require('./compiler');
const tokenizer = require('./tokenize');
const parser = require('./parser');

const mode = ' DEBUG'

print('---- get source file ----');
const pgrm = fs.readFileSync('./instruction.dm').toString();
print(pgrm);
print('---- tokenize ----');
const tokens = tokenizer.tokenize_prgm(pgrm);
print(tokens)
print('---- Transforming to AST ----');
const ast = parser.parse(tokens);
print(ast)
print('---- Compiling to Javascript ----');
const compiled = visitor.visitNodes(ast);
print(compiled);

print('---- Adding DM Libraries ----');
const lib = `require('./lib/index')\n`;

print('---- Writing to file ----');
fs.writeFileSync('./out.js', lib+compiled);

print('---- Executing out.js ----');
const output = execSync('node out.js', { encoding: 'utf-8' });
console.log('Output :\n', output);


function print(any) {
    if (mode == 'DEBUG') {
        console.log(any);
    }
}
const compiler = require('../core/compiler');
const parser = require('../core/parser');
const tokenizer = require('../core/tokenize');
var beautify_js = require('js-beautify').js_beautify

export function transpileToJS(pgrm) {
    const tokens = tokenizer.tokenize_prgm(pgrm);
    const ast = parser.parse(tokens);
    const compiled = compiler.visitNodes(ast);
    const lib = `require('./lib/index');\n\n`;
    return beautify(lib+compiled);
}

export function beautify(code) {
    var formattedJSON = beautify_js(code, { indent_size: 2 });
    return formattedJSON;
}
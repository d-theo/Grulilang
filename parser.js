const { assert } = require('chai');

module.exports = {
    parseFor,
    parse
};

function parseFor(tokens) {
    if (tokens[0].type !== 'for') {
        return false;
    }
    tokens.shift();

    const variableAssigned = tokens.shift();
    tokens.shift();
    const iteratee = tokens.shift();
    const instructions = [];
    while(tokens[0].type !== 'endfor') {
        const stmt = parseStatement(tokens);
        instructions.push(stmt);
    }
    tokens.shift();
    return {
        type : 'for',
        iteratee,
        variableAssigned,
        instructions
    }
}

function parseFunction(functionBlock) {
    if (functionBlock[0].type !== 'function') {
        return false;
    }
    const x = functionBlock.shift();
    return x;
}

function parseStatement(tokens) {
    if (tokens[0].type === 'for') {
        return parseFor(tokens);
    } else if (tokens[0].type === 'function') {
        return parseFunction(tokens);
    }
}

function parse(tokens) {
    const ast = [];
    while(tokens.length > 0) {
        ast.push(parseStatement(tokens));
    }
    return ast;
}

/*(function itShouldParseFor() {
    const tokens = [
        {"type":"for","value":"","length":3},
        {"type":"variable","value":"test","length":5},
        {"type":"in","value":"","length":2},
        {"value":["toto"],"type":"array","length":8},
        {"type":"function","args":[{"type":"variable","value":"test","length":5}],"value":"MODIFY","length":13},
        {"type":"endfor","value":"","length":6}];
    const parsed = parseFor(tokens, 0);
    console.log(parsed);
}());*/
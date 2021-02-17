const { assert } = require('chai');

module.exports = {
    parseFor,
    parse,
    parseFunction
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

    const definition = functionBlock.shift();
    const args = [];
    while(functionBlock[0].type !== 'close_parenthesis') {
        let arg = functionBlock.shift();
        if (arg.type !== 'separator' && arg.type !== 'close_parenthesis' && arg.type !== 'open_parenthesis') {
            if (arg.type === 'function') {
                functionBlock.unshift(arg);
                const func = parseFunction(functionBlock);
                args.push(func);
            } else {
                args.push(arg);
            }
        }
    }
    functionBlock.shift(); // close_paren
    return {
        type: definition.type,
        args,
        value: definition.value
    };
}

function parseStatement(tokens) {
    if (tokens[0].type === 'for') {
        return parseFor(tokens);
    } else if (tokens[0].type === 'function') {
        return parseFunction(tokens);
    } else {
        throw new Error('cannot parseStatement', tokens)
    }
}

function parse(tokens) {
    const ast = [];
    while(tokens.length > 0) {
        ast.push(parseStatement(tokens));
    }
    return ast;
}
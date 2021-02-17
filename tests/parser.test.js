const { assert } = require('chai');
const parser = require('../core/parser');

(function testParseFor() {
    const tokens = [
        {"type":"for","value":"","length":3},
        {"type":"variable","value":"test","length":5},
        {"type":"in","value":"","length":2},
        {"value":["toto"],"type":"array","length":8},
        { type: 'function', value: 'TEST', length: 4 },
        { type: 'open_parenthesis', value: '(', length: 1 },
        { type: 'string', value: 'coucou', length: 8 },
        { type: 'close_parenthesis', value: ')', length: 1 },
        {"type":"endfor","value":"","length":6}];
    const parsed = parser.parseFor(tokens, 0);
    assert.equal(parsed.type, 'for')
    assert.equal(parsed.iteratee.type, 'array')
    assert.equal(parsed.variableAssigned.type, 'variable')
    assert.equal(parsed.variableAssigned.value, 'test')
    assert.equal(parsed.instructions[0].type, 'function')
}());

(function testParseFunctionInFunction() {
    const tokens = [
        { type: 'function', value: 'TEST', length: 4 },
        { type: 'open_parenthesis', value: '(', length: 1 },
        { type: 'string', value: 'coucou', length: 8 },
        { type: 'separator', value: ',', length: 1 },
        { type: 'function', value: 'TEST', length: 4 },
        { type: 'open_parenthesis', value: '(', length: 1 },
        { type: 'string', value: 'coucou', length: 8 },
        { type: 'close_parenthesis', value: ')', length: 1 },
        { type: 'close_parenthesis', value: ')', length: 1 }
      ];
    const res = parser.parseFunction(tokens);
    assert.equal(res.type, "function");
    assert.equal(res.args[1].type, "function");
    assert.equal(res.args[1].args.length, 1);
}());

(function testParseFunction() {
    const tokens = [
        { type: 'function', value: 'TEST', length: 4 },
        { type: 'open_parenthesis', value: '(', length: 1 },
        { type: 'string', value: 'coucou', length: 8 },
        { type: 'close_parenthesis', value: ')', length: 1 }
    ];
    const res = parser.parseFunction(tokens);
    assert.equal(res.type, 'function')
    assert.equal(res.args.length, 1)
    assert.equal(res.args[0].type, "string")
}());
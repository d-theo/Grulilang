const { assert } = require('chai');
const parser = require('../core/parser');

(function testParseFor() {
    const tokens = [
        {"type":"for","value":"","length":3},
        {"type":"variable","value":"test","length":5},
        {"type":"in","value":"","length":2},
        {"value":["toto"],"type":"array","length":8},
        {"type":"function","args":[{"type":"variable","value":"test","length":5}],"value":"MODIFY","length":13},
        {"type":"endfor","value":"","length":6}];
    const parsed = parser.parseFor(tokens, 0);
    assert.equal(parsed.type, 'for')
    assert.equal(parsed.iteratee.type, 'array')
    assert.equal(parsed.variableAssigned.type, 'variable')
    assert.equal(parsed.variableAssigned.value, 'test')
    assert.equal(parsed.instructions[0].type, 'function')
}());
const { assert } = require('chai');
const tokenizer = require('../core/tokenize');

assert.equal(tokenizer.tokenize('"test"').value, "test");
assert.equal(tokenizer.tokenize('$test').value, 'test');
assert.equal(tokenizer.tokenize('["test"]').type, "array");
assert.equal(tokenizer.tokenize('TEST()').type, 'function');

assert.equal(tokenizer.t_string('"test"').value, "test");
assert.equal(tokenizer.t_string('"test"').type, "string");
assert.equal(tokenizer.t_string('"test"').length, 6);

assert.equal(tokenizer.t_var('$test').value, 'test');
assert.equal(tokenizer.t_var('$test').type, 'variable');
assert.equal(tokenizer.t_var('$test').length, 5);

assert.equal(tokenizer.t_for('FOR').type, 'for');
assert.equal(tokenizer.t_for('FOR').value, '');

assert.equal(tokenizer.t_in('IN').type, 'in');
assert.equal(tokenizer.t_in('IN').value, '');

assert.equal(tokenizer.t_array('[]').value.length, 0);
assert.equal(tokenizer.t_array('[]').type, "array");
assert.equal(tokenizer.t_array('[]').length, 2);

assert.equal(tokenizer.t_array('["test"]').value[0], "test");
assert.equal(tokenizer.t_array('["test"]').type, "array");
assert.equal(tokenizer.t_array('["test"]').length, 8);

assert.equal(tokenizer.t_array('["test", "lol"]').value[0], "test");
assert.equal(tokenizer.t_array('["test", "lol"]').value[1], "lol");
assert.equal(tokenizer.t_array('["test", "lol"]').type, "array");
assert.equal(tokenizer.t_array('["test", "lol"]').length, 15);

assert.equal(tokenizer.t_func('TEST()').value, 'TEST');
assert.equal(tokenizer.t_func('TEST()').type, 'function');

assert.equal(tokenizer.t_func('TEST("coucou",["test"],TEST())').value, 'TEST');
assert.equal(tokenizer.t_func('TEST("coucou",["test"],TEST())').length, 30);
assert.equal(tokenizer.t_func('TEST("coucou",["test"],TEST())').args.length, 3);

assert.equal(tokenizer.t_func('TEST ( "coucou" )').value, 'TEST');
assert.equal(tokenizer.t_func('TEST ( "coucou" )').length, 17);
assert.equal(tokenizer.t_func('TEST ( "coucou" )').args[0].value, "coucou");

assert.equal(tokenizer.t_func('TEST ( "coucou" , "theo" )').value, 'TEST');
assert.equal(tokenizer.t_func('TEST ( "coucou" , "theo" )').length, 26);

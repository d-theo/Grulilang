function visitNodes(nodes) {
    return nodes.map(n => visitNode(n)).join('\n');
}
function visitNode(node) {
    if (node.type === 'for') {
        return visitFor(node);
    } else if(node.type === 'function') {
        return visitFunction(node);
    } else if(node.type === 'string') {
        return visitString(node);
    }
}
function visitString(node) {
    return `"${node.value}"`;
}
function visitFor(forBlock) {
    return `for (let ${forBlock.variableAssigned.value} of ${JSON.stringify(forBlock.iteratee.value)}) {
        ${forBlock.instructions.map(i => visitNode(i))}
    }`
}
function visitFunction(functionBlock) {
    return `${functionBlock.value}(${functionBlock.args.map(arg => visitNode(arg))})`;
}

module.exports = {
    visitNodes,
};
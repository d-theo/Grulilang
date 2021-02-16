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
    } else if(node.type === 'variable') {
        return visitVariable(node);
    }
}
function visitString(node) {
    return `"${node.value}"`;
}
function visitVariable(node) {
    return `${node.value}`;
}
function visitFor(forBlock) {
    console.log(JSON.stringify(forBlock));
    return `for (let ${forBlock.variableAssigned.value} of ${JSON.stringify(forBlock.iteratee.value)}) {
        ${forBlock.iteratee.value.map(_ => {
            return forBlock.instructions.map(i => visitNode(i))
        }).join('\n')}
    }`
}
function visitFunction(functionBlock) {
    return `${functionBlock.value}(${functionBlock.args.map(arg => visitNode(arg))})`;
}

module.exports = {
    visitNodes,
};
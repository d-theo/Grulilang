function visitNodes(nodes) {
    const header = 'async function main() {';
    const body = nodes.map(n => visitNode(n)).join('\n');
    const footer = `}
    main();
    `;
    return header + '\n\t' + body + '\n' +footer;
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
    return `for (let ${forBlock.variableAssigned.value} of ${JSON.stringify(forBlock.iteratee.value)}) {
            ${forBlock.instructions.map(i => visitNode(i)).join('\n')}
    }`;
}
function visitFunction(functionBlock) {
    return `(await ${functionBlock.value}(${functionBlock.args.map(arg => visitNode(arg))}))`;
}

module.exports = {
    visitNodes,
};
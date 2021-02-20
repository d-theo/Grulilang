var Styles = {
    variable: "variable",
    function: "function",
    keyword: "keyword",
    string: "string",
    unknown: "unknown",
}

CodeMirror.defineMode("grulilang", function(config, parserConfig) {
    // Interface
    config.indentWithTabs = true;
    return {
        startState: function () {
            return {
                inFor: 0
            };
        },
        token: function(stream, state) {
            if (stream.match("FOR")) {
                state.inFor ++;
                return Styles.keyword;
            }
            if (stream.match("IN")) {
                return Styles.keyword;
            }
            if (stream.match("ENDFOR")) {
                state.inFor --;
                return Styles.keyword;
            }
            if (stream.match(/^\$[a-zA-Z0-9]+/)) {
                return Styles.variable;
            }
            if (stream.match(/"[^"]*"/)) {
                return Styles.string
            }
            if (stream.match(/[A-Z_]+\(/)) {
                stream.backUp(1);
                if(recognisedFunction().indexOf(stream.current()) < 0) {
                    return Styles.unknown;
                } else {
                    return Styles.function;
                }
            }
            stream.next();
            return null;
        },
        indent: function(state, textAfter) {
            return state.inFor * 4;
        }
    };
});

CodeMirror.registerHelper("hint", "grulilang", function(editor, options) {
    let allFunctions = allowedFunction();
    var Pos = CodeMirror.Pos, cmpPos = CodeMirror.cmpPos;
    var cur = editor.getCursor(), curLine = editor.getLine(cur.line);
    var start = cur.ch, end = start;

    var word = editor.findWordAt(editor.getCursor());
    const currWord = editor.getRange(word.anchor, word.head);

    console.log(currWord);
    if (currWord[0] != '\t') {
        allFunctions = allFunctions.filter(f => f.displayText.includes(currWord));
    }
    
    const delta = currWord[0] == '\t' ? 0 : currWord.length;

    return {list: allFunctions, from: Pos(cur.line, start - delta), to: Pos(cur.line, start)};
});

function recognisedFunction() {
    return [
        "CHANGE",
        "ALL_ORGA",
        "AT_CHANGE",
        "ENV",
        "FILE",
        "NDF_BLACKLIST",
        "PRINT",
    ]
}
function allowedFunction() {
    return [
        {text: "CHANGE(orga, propertyKey, field, value)", displayText: "CHANGE", verbose: "CHANGE(orga: string, prop: string, field: string, value)"},
        {text: "ALL_ORGA()", displayText: "ALL_ORGA", verbose: "ALL_ORGA()"},
        {text: "AT_CHANGE(allOrga, orgas, propertyKey, field, value)", displayText: "AT_CHANGE", verbose: "AT_CHANGE(allOrga: boolean, orga: array, propertyKey: string, field: string, value)"},
        {text: "ENV(string)", displayText: "ENV", verbose: "ENV(string)"},
        {text: "FILE(string)", displayText: "FILE", verbose: "FILE(string)"},
        {text: "NDF_BLACKLIST(propertyKey, boolean)", displayText: "NDF_BLACKLIST", verbose: "NDF_BLACKLIST(propertyKey: string, boolean)"},
        {text: "PRINT(someting)", displayText: "PRINT", verbose: "PRINT(object: string)"},
        {text: "FOR $variable IN []\n\nENDFOR", displayText: "FOR .. IN", verbose: "FOR $variable IN []\n\nENDFOR"}
    ];
}
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

function recognisedFunction() {
    return [
        "MODIFY",
        "ALL_ORGA",
        "AT_CHANGE",
        "ENV",
        "FILE",
        "NDF_BLACKLIST",
        "PRINT",
    ]
}
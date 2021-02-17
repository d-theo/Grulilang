module.exports = {
    tokenize_prgm,
    t_for,
    t_in,
    t_endfor,
    t_string,
    t_array,
    t_var,
    t_func,
    tokenize,
    eat,
};

function tokenize_prgm(pgrm) {
    const tokens = [];
    while(pgrm.length > 0) {
        const x = tokenize(pgrm);
        tokens.push(x);
        pgrm = pgrm.substring(x.length);
        pgrm = pgrm.substring(eat(pgrm));
    }
    return tokens;
}

function eat(str) {
    cpt = 0;
    while(true) {
        if (str[cpt] != ' ' && str[cpt] != '\n' && str[cpt] != '\t') {
            console.log('not a blank', str[cpt])
            return cpt;
        }
        cpt ++;
    }
}

function tokenize(str) {
    if (t_for(str)) {
        return t_for(str);
    } else if (t_boolean(str)) {
        return t_boolean(str);
    }else if (t_in(str)) {
        return t_in(str);
    } else if(t_endfor(str)) {
        return t_endfor(str);
    } else if (t_string(str)) {
        return t_string(str);
    } else if (t_array(str)) {
        return t_array(str);
    } else if (t_var(str)) {
        return t_var(str);
    } else if (t_func(str)) {
        return t_func(str);
    } else {
        throw new Error("unknown "+str);
    }
}
function t_boolean(str) {
    const True = 'True'
    const False = 'False'
    if (str.substring(0,True.length) === True || str.substring(0,False.length) === False) {
        return {
            type: 'boolean',
            value: str.substring(0,True.length) === True ? true : false,
            length: str.substring(0,True.length) === True ? 4 : 5,
        }
    } else {
        return false;
    }
}
function t_for(str) {
    if (str.substring(0,3) === 'FOR') {
        return {
            type: 'for',
            value: '',
            length: 3,
        }
    } else {
        return false;
    }
}

function t_in(str) {
    if (str.substring(0,2) === 'IN') {
        return {
            type: 'in',
            value: '',
            length: 2,
        }
    } else {
        return false;
    }
}

function t_endfor(str) {
    if (str.substring(0,'ENDFOR'.length) === 'ENDFOR') {
        return {
            type: 'endfor',
            value: '',
            length: 'ENDFOR'.length,
        }
    } else {
        return false;
    }
}

function t_string(str) {
    let cpt = 1;
    let word = "";
    if (str[0] === '"') {
        while(true) {
            let l = str[cpt];
            if (l === '"' ) {
                return {
                    type: 'string',
                    value: word,
                    length: cpt+1,
                }
            } else {
                word += l;
                cpt ++;
            }
        }
    } else {
        return false;
    }
}
function t_array(str) {
    if (str[0] === '[') {
        let cpt = 1;
        let l = str[cpt];
        while(l !== ']') {
            cpt ++;
            l = str[cpt];
        }
        const array = eval(str.substring(0, cpt+1));

        cpt++;
        return {
            value: array,
            type: 'array',
            length: cpt
        };
    } else {
        return false;
    }
}
function t_var(str) {
    let cpt = 1;
    let word = "";
    if (str[0] === '$') {
        while(true) {
            let l = str[cpt];
            if (l === ' ' || l === '\n' || l === undefined || l === ',' || l === ')') {
                return {
                    type: 'variable',
                    value: word,
                    length: cpt,
                }
            } else {
                word += l;
                cpt ++;
            }
        }
    }
}

// func(func(a,b),c)
function t_func(str) {
    let cpt = 0;
    let funcName = "";
    while(true || cpt > 100) {
        let l = str[cpt];
        if (l === '(') {
            break;
        } else {
            funcName += l;
            cpt ++;
        }
    }
    cpt ++;
    const args = [];
    while (str[cpt] !== ')') {
        const sub = str.substring(cpt);
        const t = tokenize(sub);
        cpt += t.length;
        args.push(t);
        if (str[cpt] === ',') {
            cpt++;
        }
    }
    cpt++;
    return {
        type: 'function',
        args,
        value: funcName,
        length: cpt
    };
}
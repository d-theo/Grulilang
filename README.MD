### BUT : faire un mini langage de programmation pour datamanager

#### Usage

```
// ecrire dans instruction.dm
node grulilang.js
```

#### TOTO FUNCTION disponibles

* #ALL_PROPERTIES(orga)
* #AT_PROPERTIES(orga)
* #CUSTOM_PROPERTIES(orga)
* NOTIFY(orga, prop)

#### Functions disponible
```
ENV(env)
ALL_ORGA()
CHANGE(orga,prop,field,value)
```

#### Operateurs disponible

* for -> FOR $var IN [array|function] ENDFOR
* array -> ["string",...]
* string -> "string"
* boolean -> True | False

AT/CUSTOM
MANAGER/ANALYTICS
READONLY // regle?
INTERNAL_HIDDEN

CHANGE("ATI", "test", "rule", FILE('rule.json'));


PROCEDURE(variables...)
variable = FUNCTION / STRING / NUMBER / BOOLEAN / ARRAY


LINE = FOR | PROCEDURE
FOR = FOR declaration IN variable
PROCEDURE = NAME(string,string,string,any)



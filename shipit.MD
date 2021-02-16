### BUT : faire un mini langage de programmation pour datamanager

#### MACRO disponibles

* ALL_ORGA
* ALL_PROPERTIES(orga)
* AT_PROPERTIES(orga)
* CUSTOM_PROPERTIES(orga)

#### Functions disponible
```
CHANGE(orga,prop)
    TRAD
    HIDDEN
    INTERNAL_HIDDEN
    RULE
NOTIFY(orga, prop)
```

#### Operateurs disponible

* FOR $var IN array
* array string : ["string"]
* string "string"


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



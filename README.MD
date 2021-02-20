### BUT : faire un mini langage de programmation pour datamanager

#### Usage

```
node grulilang.js file
```

#### UI
lancer le fichier ui/index.html

#### Functions disponible
```
ENV(env)
env => "dev" | "integ" | "preprod" | "prod"
```
```
ALL_ORGA() // ["orga1",...]
```

```
CHANGE(orga: string,prop: string,field: string,value)
CHANGE("ATI", "demo_1", "hidden" , True)
CHANGE("ATI", "demo_1", "rule" , FILE("./rule.json"))
CHANGE("ATI", "demo_1", "name.en" , "a new name")
```

```
AT_CHANGE(allOrga: boolean, orga: array, propertyKey: string, field: string, value)
possible field ->
    "name.fr"
    "name.es"
    "name.de"
    "name.en"
    "description.en"
    "description.fr" 
    "description.es" 
    "description.de" 
    "ATTags"
    "internalHidden"
    "hidden"
    "scope"
    "readOnly"
    "customerType"
```

```
NDF_BLACKLIST(propertyKey, boolean)
ex : NDF_BLACKLIST("test_1", True)
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



ENV("dev")
FOR $orga IN ALL_ORGA()
    FOR $property IN ["src_1"]
        CHANGE($orga,$property,"rule",JSON("./rule.json"))
    ENDFOR
ENDFOR
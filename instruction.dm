ENV("dev")
FOR $orga IN ["ATI"]
    FOR $property IN ["bvbvbv"]
        CHANGE($orga, $property, "rule", FILE("./rule.json"))
    ENDFOR
ENDFOR
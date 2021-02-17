ENV("dev")
FOR $orga IN ["ATI"]
    FOR $property IN ["bvbvbv"]
        CHANGE($orga,$property,"hidden",False)
    ENDFOR
ENDFOR
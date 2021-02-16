FOR $orga IN ["ATI","ATIDEMO"]
    FOR $property IN ["src_1"]
        CHANGE($orga,$property,"name.fr","ma nouvelle description")
    ENDFOR
ENDFOR
ENV("dev")
FOR $orga IN ALL_ORGA()
    NOTIFY_UPDATE($orga, "test")
ENDFOR
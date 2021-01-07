import React, { useCallback, useState } from "react";

import { ipcRenderer } from "electron";

import { Button, ButtonGroup, Typography } from "@material-ui/core";

interface ComponentProps {
}

let TrayControl: React.FC<ComponentProps> = () => {
    const [trayIcons, setTrayIcons] = useState(0);

    const changeNumberOfTrayIcons = useCallback((action: "add" | "remove") => {
        setTrayIcons(
            icons => icons + (action === "remove" ? -1 : 1)
        );
        ipcRenderer.send(action === "remove" ? "remove-tray-icon" : "add-tray-icon", {});
    }, []);

    return <ButtonGroup color="primary">
        <Button
            onClick={() => changeNumberOfTrayIcons("remove")}
        >-</Button>
        <Typography variant="button">{trayIcons}</Typography>
        <Button
            onClick={() => changeNumberOfTrayIcons("add")}
        >+</Button>
    </ButtonGroup>;
};

export default TrayControl;
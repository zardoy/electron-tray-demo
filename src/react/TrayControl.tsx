import React, { useCallback, useState } from "react";

import { ipcRenderer } from "electron";

import { Button, ButtonGroup } from "@material-ui/core";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";

interface ComponentProps {
}

let TrayControl: React.FC<ComponentProps> = () => {
    const [trayIcons, setTrayIcons] = useState(0);
    const [minReached, setMinReached] = useState(true);

    const changeNumberOfTrayIcons = useCallback((action: "add" | "remove") => {
        setTrayIcons(iconsInTray => {
            iconsInTray += (action === "remove" ? -1 : 1);
            // disable "-" button if no icons in tray anymore
            setMinReached(iconsInTray <= 0);
            // return updated value
            return iconsInTray;
        });
        ipcRenderer.send(action === "remove" ? "remove-tray-icon" : "add-tray-icon", {});
    }, []);

    return <ButtonGroup color="primary" size="large">
        <Button
            // if disabled is true onClick won't fire
            disabled={minReached}
            onClick={() => changeNumberOfTrayIcons("remove")}
        >
            {/* ideally we should use iherit property, but icon looks too small in this way */}
            <RemoveIcon fontSize="small" />
        </Button>
        <Button
            disabled
        >{trayIcons}</Button>
        <Button
            onClick={() => changeNumberOfTrayIcons("add")}
        >
            <AddIcon fontSize="small" />
        </Button>
    </ButtonGroup>;
};

export default TrayControl;
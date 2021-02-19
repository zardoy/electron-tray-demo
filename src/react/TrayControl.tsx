import React, { useCallback, useLayoutEffect, useState } from "react";

import { typedIpcRenderer } from "typed-ipc";

import { Button, ButtonGroup } from "@material-ui/core";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";

interface ComponentProps {
}

let TrayControl: React.FC<ComponentProps> = () => {
    const [trayIcons, setTrayIcons] = useState(0);

    const changeNumberOfTrayIcons = useCallback((action: "add" | "remove") => {
        setTrayIcons(
            // remember that in JS you can use variables with the same name in different locations
            // and that's fine for short functions like this, but in bigger one you shouldn't do this to avoid confusion
            trayIcons => trayIcons + (action === "remove" ? -1 : 1)
        );
        typedIpcRenderer.send(action === "remove" ? "removeTrayIcon" : "addTrayIcon");
    }, []);

    // we need to update the number of tray icons as fast as possible so we use useLayoutEffect instead of useEffect
    // interesting fact: with this hack you probably won't see the initial value (zero)
    useLayoutEffect(() => {
        (async () => {
            // we could manually refresh the page (CTRL+R) after we added some tray icons, so to keep app in sync we do this:
            const trayIcons = await typedIpcRenderer.request("getTraysNumber");
            setTrayIcons(trayIcons);
        })();
    }, []);

    return <ButtonGroup color="primary" size="large">
        <Button
            // do not user allow to make negative number of tray icons (onClick will not fire). You can try to comment this line
            disabled={trayIcons <= 0}
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
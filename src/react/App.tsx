import React, { useMemo } from "react";

import { createMuiTheme, CssBaseline, Grid, MuiThemeProvider, useMediaQuery } from "@material-ui/core";

import TrayControl from "./TrayControl";

interface ComponentProps {
}

let App: React.FC<ComponentProps> = () => {
    const isDarkTheme = useMediaQuery(`(prefers-color-scheme: dark)`);
    const muiTheme = useMemo(
        () => createMuiTheme({
            palette: {
                type: isDarkTheme ? "dark" : "light",
                // primary: lightBlue,
                // secondary: blue
            }
        }),
        [isDarkTheme]
    );

    return <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Grid
            // It's a flex container
            container
            style={{ height: "100vh" }}
            justify="center"
            alignItems="center"
        >
            <TrayControl />
        </Grid>
    </MuiThemeProvider>;
};

export default App;
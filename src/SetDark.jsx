import { useState } from "react";
import Button from "@mui/material/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const SetDarkTheme = () => {
    const [isDark, setIsDark] = useState(false);

    const setTheme = (CurIsDark) => {
        var bg_color = "white";
        var body = document.getElementsByTagName("BODY")[0];
        var html = document.getElementsByTagName("HTML")[0];
        html.style.backgroundColor = bg_color;
        body.style.backgroundColor = bg_color;
        var head = document.getElementsByTagName("head")[0];
        var style = document.createElement("style");
        var css = "";
        if (CurIsDark) {
            css =
                "html {-webkit-filter: invert(87%) hue-rotate(180deg);" +
                "-moz-filter: invert(87%) hue-rotate(180deg);" +
                "-o-filter: invert(87%) hue-rotate(180deg);" +
                "-ms-filter: invert(87%) hue-rotate(180deg); }";
        } else {
            css =
                "html {-webkit-filter: invert(0%);" +
                "-moz-filter: invert(0%);" +
                "-o-filter: invert(0%);" +
                "-ms-filter: invert(0%); }";
        }
        style.type = "text/css";
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    };

    return (
        <Button
            variant="contained"
            onClick={() => {
                const CurIsDark = !isDark;
                console.log(CurIsDark);
                setIsDark(CurIsDark);
                setTheme(CurIsDark);
            }}
        >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </Button>
    );
};

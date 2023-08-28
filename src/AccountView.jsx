import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

export const AccountView = ({ row }) => {
    return (
        <>
            <p>
                <Tooltip title={row.note}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (!row.link) {
                                return;
                            }
                            window.open(
                                row.link,
                                "_blank" // <- This is what makes it open in a new window.
                            );
                        }}
                    >
                        {row.website}
                    </Button>
                </Tooltip>
                <Button
                    variant="outlined"
                    onClick={() => {
                        navigator.clipboard.writeText(row.username || "");
                    }}
                >
                    User Name
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        navigator.clipboard.writeText(row.password || "");
                    }}
                >
                    Password
                </Button>
            </p>
        </>
    );
};

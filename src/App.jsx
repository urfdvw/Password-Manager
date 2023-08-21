import { useState } from "react";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import schema from "./schema.json";
import uiSchema from "./uiSchema.json";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { SetDarkTheme } from "./SetDarkTheme";
import { useFileHandle } from "./useFileHandle";
import { encode, decode } from "./cypherUtils";

function App() {
    const [formData, setFormData] = useState({});
    const { openFile, writeFile, fileHandleReady } = useFileHandle();
    const [masterKey, setMasterKey] = useState("");

    const handleLoad = async () => {
        const fileContents = await openFile();
        var encoded = encode(JSON.parse(fileContents), masterKey);
        setFormData(encoded);
    };
    const handleSubmit = async (e) => {
        if (confirm("Save data")) {
            const curFormData = e.formData;
            setFormData(curFormData);
            await writeFile(JSON.stringify(decode(curFormData, masterKey)));
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom>
                    Password Manager
                </Typography>
                <SetDarkTheme />
            </Box>
            <TextField
                id="standard-basic"
                label="Master Key"
                // variant="filled"
                type="password"
                size="small"
                value={masterKey}
                onChange={(e) => {
                    setMasterKey(e.target.value);
                }}
            />
            {masterKey ? (
                fileHandleReady ? (
                    <Form
                        formData={formData}
                        schema={schema}
                        uiSchema={uiSchema}
                        validator={validator}
                        onSubmit={handleSubmit}
                        omitExtraData={true}
                    />
                ) : (
                    <Button
                        variant="outlined"
                        onClick={handleLoad}
                        size="large"
                    >
                        Load Data
                    </Button>
                )
            ) : null}
        </>
    );
}

export default App;

import { useState } from "react";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import schema from "./schema.json";
import uiSchema from "./uiSchema.json";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SetDarkTheme } from "./SetDarkTheme";
import { useFileHandle, download } from "./useFileHandle";

function App() {
    const [formData, setFormData] = useState({});
    const { openFile, writeFile } = useFileHandle();

    const handleLoad = async () => {
        const fileContents = await openFile();
        setFormData(JSON.parse(fileContents));
    };
    const handleExport = async () => {
        download(JSON.stringify(formData), "data.json", "text");
    };
    const handleSubmit = async (e) => {
        const curFormData = e.formData;
        console.log(curFormData);
        setFormData(curFormData);
        await writeFile(JSON.stringify(curFormData));
    };

    return (
        <>
            <Typography variant="h1" gutterBottom>
                Password Manager
            </Typography>
            <Button variant="outlined" onClick={handleLoad}>
                Load Data
            </Button>
            <Button variant="outlined" onClick={handleExport}>
                Export
            </Button>
            <SetDarkTheme />
            <Form
                formData={formData}
                schema={schema}
                uiSchema={uiSchema}
                validator={validator}
                onSubmit={handleSubmit}
                omitExtraData={true}
            />
        </>
    );
}

export default App;

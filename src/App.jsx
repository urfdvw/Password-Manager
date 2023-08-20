import { useState } from "react";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import schema from "./schema.json";
import uiSchema from "./uiSchema.json";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SetDarkTheme } from "./SetDark";

function App() {
    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        console.log(e.formData);
    };
    return (
        <>
            <Typography variant="h1" gutterBottom>
                Password Manager
            </Typography>
            <Button
                variant="outlined"
                onClick={() => {
                    setFormData({
                        accounts: [
                            {
                                website: "hi",
                            },
                        ],
                    });
                }}
            >
                Load Data
            </Button>
            <Button variant="outlined">Export</Button>
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

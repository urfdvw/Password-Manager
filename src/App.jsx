import { useState } from "react";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import schema from "./schema.json";
import uiSchema from "./uiSchema.json";

function App() {
    const handleSubmit = (e) => {
        console.log(e.formData);
    };
    return (
        <>
            <Form
                schema={schema}
                uiSchema={uiSchema}
                validator={validator}
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default App;

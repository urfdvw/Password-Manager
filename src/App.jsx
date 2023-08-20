import { useState } from "react";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import schema from "./schema.json";
import uiSchema from "./uiSchema.json";

function App() {
    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        console.log(e.formData);
    };
    return (
        <>
            <button
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
                change data
            </button>
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

import { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

const schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: { type: "string", title: "Title", default: "A new task" },
        done: { type: "boolean", title: "Done?", default: false },
    },
};

function App() {
    const handleSubmit = (e) => {
        console.log(e.formData);
    };
    return (
        <>
            <Form
                schema={schema}
                validator={validator}
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default App;

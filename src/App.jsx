import { useState } from "react";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import schema from "./schema.json";
import uiSchema from "./uiSchema.json";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SetDarkTheme } from "./SetDarkTheme";
import { useFileHandle } from "./useFileHandle";
import { encode, decode } from "./cypherUtils";
import { HelpInfo } from "./HelpInfo";
import { PassWord } from "./PassWord";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel, a11yProps } from "./TabPanel";
import { AccountView } from "./accountView";

function sortByGroup(curFormData) {
    let out = [];
    for (const group of schema.definitions.account.properties.group.enum) {
        out = [
            ...out,
            ...curFormData.accounts.filter((row) => row.group === group),
        ];
    }
    return { accounts: out };
}

function App() {
    const [formData, setFormData] = useState({});
    const { openFile, writeFile, fileHandleReady } = useFileHandle();
    const [masterKey, setMasterKey] = useState("");
    const [tabValue, setTabValue] = useState(0);

    const handleLoad = async () => {
        const fileContents = await openFile();
        var encoded = encode(JSON.parse(fileContents), masterKey);
        setFormData(encoded);
    };
    const handleSubmit = async (e) => {
        if (confirm("Save data")) {
            const curFormData = sortByGroup(e.formData);
            setFormData(curFormData);
            await writeFile(JSON.stringify(decode(curFormData, masterKey)));
        }
    };
    const handleChange = (e) => {
        setFormData(e.formData);
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
            <PassWord
                masterKey={masterKey}
                setMasterKey={setMasterKey}
                label="Master Key"
            />
            <br />
            <br />
            {masterKey ? (
                fileHandleReady ? (
                    <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                                value={tabValue}
                                onChange={(event, newValue) => {
                                    setTabValue(newValue);
                                }}
                                aria-label="basic tabs example"
                            >
                                <Tab label="View" {...a11yProps(0)} />
                                <Tab label="Edit" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={tabValue} index={0}>
                            {schema.definitions.account.properties.group.enum.map(
                                (group) => {
                                    return (
                                        <>
                                            {formData.accounts.filter(
                                                (row) => row.group === group
                                            ).length > 0 ? (
                                                <p>{group}</p>
                                            ) : null}
                                            {formData.accounts
                                                .filter(
                                                    (row) => row.group === group
                                                )
                                                .map((row) => (
                                                    <AccountView row={row} />
                                                ))}
                                        </>
                                    );
                                }
                            )}
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <Form
                                formData={formData}
                                schema={schema}
                                uiSchema={uiSchema}
                                validator={validator}
                                onSubmit={handleSubmit}
                                omitExtraData={true}
                                onChange={handleChange}
                            />
                        </TabPanel>
                    </Box>
                ) : (
                    <Button
                        variant="outlined"
                        onClick={handleLoad}
                        size="large"
                    >
                        Load Data File
                    </Button>
                )
            ) : (
                <HelpInfo />
            )}
        </>
    );
}

export default App;

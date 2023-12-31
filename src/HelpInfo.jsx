import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import sampleData from "./sample.json";
import { download } from "./useFileHandle";
export const HelpInfo = () => {
    const handleDownloadSample = () => {
        download(JSON.stringify(sampleData), "data.json", "text");
    };
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <Typography variant="h4" gutterBottom>
                How to use?
            </Typography>

            <Typography variant="h5" gutterBottom>
                1. If you do not have a data file
            </Typography>
            <p>
                Down load a sample data file to start with. Move the file to a
                secured location on your device. The master key of the sample
                data file is `0` (one digit string zero).
            </p>
            <Button
                variant="outlined"
                onClick={handleDownloadSample}
                size="large"
            >
                Download Sample Data File
            </Button>
            <br />
            <br />
            <Typography variant="h5" gutterBottom>
                2. When you already have a data file
            </Typography>
            <p>
                First, type in the master key of your file above. Then click on
                [Load Data File], and select your file in the file opening
                diaglog. Once done editing, click on the [Save] button at the
                buttom
            </p>
            <br />
            <Typography variant="h5" gutterBottom>
                3. If you want to change the master key
            </Typography>
            <p>
                Open the file with the old master key, type in your new master
                key and save.
            </p>
        </div>
    );
};

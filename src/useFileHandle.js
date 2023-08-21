import { useState } from "react";
export const useFileHandle = () => {
    const [fileHandle, setFileHandle] = useState();

    const openFile = async () => {
        let fileHandle;
        [fileHandle] = await window.showOpenFilePicker();
        setFileHandle(fileHandle);
        const file = await fileHandle.getFile();
        const contents = await file.text();
        return contents;
    };

    const writeFile = async (contents) => {
        console.log('fileHandle', fileHandle)
        // Create a FileSystemWritableFileStream to write to.
        const writable = await fileHandle.createWritable();
        // Write the contents of the file to the stream.
        await writable.write(contents);
        // Close the file and write the contents to disk.
        await writable.close();
    };

    return { openFile, writeFile };
};

export function download(data, filename, type) {
    // Function to download data to a file
    console.log(data)
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
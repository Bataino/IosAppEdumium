import { Filesystem, Directory } from '@capacitor/filesystem';

export const download = async(link) => {
    let t =1
    if (1 == t){
        window.location.href = link
    }
    const response = await fetch(link);
    // convert to a Blob
    const blob = await response.blob();

    // helper function
    const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

    // convert to base64 data, which the Filesystem plugin requires
    const base64Data = await convertBlobToBase64(blob);

    await Filesystem.writeFile({
        path: "Edumium/Homework",
        data: base64Data,
        directory: Directory.Documents
    });

    
}
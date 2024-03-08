

export const convertFile_toLink = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader()
        reader.onload = (event) => {
            resolve(event.target?.result as string)
        }
        reader.onerror = (event) => {
            reject(new Error("Error reading the file"))
        };
        reader.readAsDataURL(file);

    })

}


export const convertFile_toBlob = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader()
        reader.onload = (event) => {
            if(event.target?.result instanceof ArrayBuffer){
                const blob = new Blob ([event.target.result], {type : file.type});
                resolve(blob)
            } else{
                reject(new Error("error converting file to blob"))
            }
            
        };
        reader.onerror = (event) => {
            reject(new Error("Error reading the file"))
        };
        reader.readAsArrayBuffer(file);

    })

}


export const convertBlob_toUrl = (blob: Blob): string => {
    return URL.createObjectURL(blob)

}

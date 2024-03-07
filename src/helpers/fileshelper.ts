

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
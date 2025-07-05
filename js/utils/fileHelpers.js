export async function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);   // reader.result 是 base64
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}
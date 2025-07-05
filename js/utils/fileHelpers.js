export async function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);   // reader.result 是 base64
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

export async function urlToBlob(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error("載入失敗：" + response.status);
    const blob = await response.blob();
    return blob;
}
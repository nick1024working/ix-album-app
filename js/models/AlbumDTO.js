export function createAlbumDTO(meta, photoList) {
    return {
        name: meta.name || '',
        description: meta.description || '',
        dateTaken: meta.dateTaken || '',
        createdAt: meta.createdAt || new Date().toISOString(),
        photos: photoList || '',
    };
}
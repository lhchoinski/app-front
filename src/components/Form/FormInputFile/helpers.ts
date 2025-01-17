export const extensionToMimeType: { [key: string]: string } = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    pdf: 'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    doc: 'application/msword',
};

export const acceptedMimeTypes = (accept: string[]) => {
    return accept.reduce((acc: { [key: string]: string[] }, ext) => {
        const mimeType = extensionToMimeType[ext];
        if (mimeType) {
            if (!acc[mimeType]) {
                acc[mimeType] = [];
            }
            acc[mimeType].push(`.${ext}`);
        }
        return acc;
    }, {});
};

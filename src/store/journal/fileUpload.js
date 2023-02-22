

const CLOUDURL = 'https://api.cloudinary.com/v1_1/dorftobe1/upload';

export const fileUpload = async (file) => {
    const body = new FormData();
    body.append('upload_preset', 'journal');
    body.append('file', file);
    try {
        const resp = await fetch(CLOUDURL, { method: 'POST', body });
        const result = await resp.json();
        return result.secure_url;
    } catch (error) {
        console.log(error);
    }
}
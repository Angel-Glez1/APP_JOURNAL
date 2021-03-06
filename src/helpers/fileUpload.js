
// Sube la imagen a clodinary
export const fileUpload = async (file) => {

	const cloudUrl = 'https://api.cloudinary.com/v1_1/dziagytau/upload';
	
	const formData = new FormData();
	formData.append('upload_preset', 'React-Journal');
	formData.append('file', file);

	try {	
		const resp = await fetch(cloudUrl,{ method: 'POST', body: formData });

		if( resp.ok ){

			const cloudResp = await resp.json()
			return cloudResp.secure_url;

		}else{
			return null;
		}

	} catch (e) {

		throw e;
	}

	
}
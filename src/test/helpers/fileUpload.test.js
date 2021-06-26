import { fileUpload } from '../../helpers/fileUpload';
import cloudinary from 'cloudinary';

cloudinary.config({
	cloud_name: 'dziagytau',
	api_key: '147588785447637',
	api_secret: '8zXPe5HD9WjIrbIJJBzzNgUJs4U'
});


describe('Prubas en la funcion fileUpload', () => {


	// test('Debe de cargar un archivo y retornar  el url', async(done) => {

	// 	const reps = await fetch('https://st2.depositphotos.com/7058020/44130/i/600/depositphotos_441306056-stock-photo-soft-blue-water-surface-with.jpg');
	// 	const blob = await reps.blob();
	// 	const file = new File([blob], 'foto.jpg');

		  
	// 	const url = await fileUpload(file);
	//  	expect( typeof url).toBe('string');

		 
	// 	//  Borrar imagen por id
	// 	const segments = url.split('/');
	// 	const img_id = segments[ segments.length - 1 ].replace('.jpg', '');
		

	// 	cloudinary.v2.api.delete_resources(img_id, {},  () => {
	// 		done()
	// 	});

	// });



	test('Debe de retornar un error',  async () => {

		const file = new File([], 'foto.jpg');
		const url = await fileUpload(file);
		expect(url).toBe(null);

	});


});
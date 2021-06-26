import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";


describe('Pruebas en el authReducer', () => {
	
	test('debe de realizar el login', () => {

		const stateInit = {};
		const action = {
			type : types.login,
			payload : {
				uid: 'test_id',
				displayName: 'Fernando'
			}
		}

		const state = authReducer(stateInit, action);
		expect(state).toEqual({
			uid: 'test_id',
			name: 'Fernando'
		});


	});



	test('debe de realizar el logout', () => {

		const stateInit = { uid: 'test_id', displayName: 'Fernando' };
		const action = { type: types.logout }

		const state = authReducer(stateInit, action);
		expect(state).toEqual({});
	})

	test('debe retornar el state por defecto si no exite una accion', () => {

		const stateInit = { uid: 'test_id', displayName: 'Fernando' };
		const action = { type: 'asasas' }

		const state = authReducer(stateInit, action);
		expect(state).toEqual(stateInit);
	})
})
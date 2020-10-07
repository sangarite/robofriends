import { CHANGE_SEARCH_FIELD, REQUEST_CONTACTS_PENDING, REQUEST_CONTACTS_SUCCESS, REQUEST_CONTACTS_FAILED } from './constans';
 
export const setSearchField = (text) => ({
	type: CHANGE_SEARCH_FIELD,
	payload: text
})

export const requestContacts = () => (dispatch) => {
	dispatch({ type: REQUEST_CONTACTS_PENDING });
	fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(data => dispatch({ type: REQUEST_CONTACTS_SUCCESS, payload: data }))
		.catch(error => dispatch({ type: REQUEST_CONTACTS_FAILED, payload: error }))
}
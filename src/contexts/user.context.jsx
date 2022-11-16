import { createContext, useEffect, useReducer, useState } from 'react';
import {
	createUserDocumentFromAuth,
	onAuthStateChangedListener,
} from '../utils/firebase/utils.firebase';
import { createAction } from '../utils/reducer/reducer.utils';

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (state, action) => {
	console.log('userReducer:action:', action);
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		default:
			throw new Error(`Unhandler type: ${type} in UserReducer`);
	}
};

const INITIAL_STATE = {
	currentUser: null,
};

export const UserProvider = ({ children }) => {
	// const [currentUser, setCurrentUser] = useState(null);
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

	const { currentUser } = state;
	console.log('UserProvider:currentUser:', currentUser);

	const setCurrentUser = (user) => {
		console.log('UserProvider:setCurrentUser:dispatched');
		dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
	};
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			console.log('UserProvider:useEffect:', user);
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});
		return unsubscribe;
	}, []);
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

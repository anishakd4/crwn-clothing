import { all, call, put, takeLatest } from 'typed-redux-saga';
import { getCategoriesAndDocuments } from '../../utils/firebase/utils.firebase';
import {
	fetchCategoriesFailed,
	fetchCategoriesSuccess,
} from './categories.action';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

export function* fetchCategoriesAsync() {
	try {
		const categoriesArray = yield* call(
			getCategoriesAndDocuments,
			'categories'
		);
		yield* put(fetchCategoriesSuccess(categoriesArray));
	} catch (error) {
		yield* put(fetchCategoriesFailed(error as Error));
	}
}

export function* onFetchCategories() {
	yield* takeLatest(
		CATEGORIES_ACTION_TYPES.SET_CATEGORIES_START,
		fetchCategoriesAsync
	);
}

export function* categoriesSaga() {
	yield* all([call(onFetchCategories)]);
}

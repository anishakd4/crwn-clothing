import {
	Action,
	createAction,
	withMatcher,
} from '../../utils/reducer/reducer.utils';
import { ActionWithPayload } from './../../utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES, Category } from './categories.types';

export type FetchCategoriesStart =
	Action<CATEGORIES_ACTION_TYPES.SET_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
	CATEGORIES_ACTION_TYPES.SET_CATEGORIES_SUCCESS,
	Category[]
>;

export type FetchCategoriesFailed = ActionWithPayload<
	CATEGORIES_ACTION_TYPES.SET_CATEGORIES_FAILED,
	Error
>;

export type CategoryAction =
	| FetchCategoriesStart
	| FetchCategoriesFailed
	| FetchCategoriesSuccess;

export const fetchCategoriesStart = withMatcher(
	(): FetchCategoriesStart =>
		createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
	(categoriesArray: Category[]): FetchCategoriesSuccess =>
		createAction(
			CATEGORIES_ACTION_TYPES.SET_CATEGORIES_SUCCESS,
			categoriesArray
		)
);

export const fetchCategoriesFailed = withMatcher(
	(error: Error): FetchCategoriesFailed =>
		createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_FAILED, error)
);

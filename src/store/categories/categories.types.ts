export enum CATEGORIES_ACTION_TYPES {
	SET_CATEGORIES_START = 'category/SET_CATEGORIES_START',
	SET_CATEGORIES_SUCCESS = 'category/SET_CATEGORIES_SUCCESS',
	SET_CATEGORIES_FAILED = 'category/SET_CATEGORIES_FAILED',
}

export type CategoryItem = {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
};

export type Category = {
	title: string;
	imageUrl: string;
	items: CategoryItem[];
};

export type CategoryMap = {
	[key: string]: CategoryItem[];
};

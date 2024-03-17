import { CreateCategoryEffects } from './effects/create-category.effects';
import { DeleteCategoryEffects } from './effects/delete-category.effects';
import { GetCategoriesEffects } from './effects/get-categories.effects';

export const categoryEffects = [CreateCategoryEffects, DeleteCategoryEffects, GetCategoriesEffects];

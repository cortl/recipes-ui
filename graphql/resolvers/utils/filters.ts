
const getKeyValue = <U extends keyof T, T extends object>(key: U, obj: T) => obj[key];

const hasField = (field: string, value: boolean) => (recipe: Recipe) => {
    const recipeValue = getKeyValue<keyof Recipe, Recipe>(field, recipe);

    return Boolean(recipeValue) === value
}

const hasValueIn = (field: string, values: any[]) => (recipe: Recipe) => {
    const recipeValue = getKeyValue<keyof Recipe, Recipe>(field, recipe);

    if (recipeValue instanceof Array) {
        return Boolean(recipeValue) && values.every(value => recipeValue.some(valueToCompare => valueToCompare === value));
    } else {
        return Boolean(recipeValue) && values.some(value => value === recipeValue);
    }
}


export { hasField, hasValueIn };
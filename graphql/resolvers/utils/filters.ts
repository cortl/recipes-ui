
const getKeyValue = <U extends keyof T, T extends object>(key: U, obj: T) => obj[key];

const hasField = (field: string, value: boolean) => (recipe: Recipe) => {
    const recipeValue = getKeyValue<keyof Recipe, Recipe>(field, recipe);

    return Boolean(recipeValue) === value
}


export { hasField };
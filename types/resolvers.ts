export type RecipesWhereInput = {
    where: {
        // rating: {
        //     gt: number;
        //     lt: number;
        //     eq: number;
        // },
        // tag: string[];
        // isArchived: boolean;
        hasImage: boolean;

        [key: string]: unknown
    }
}


export type RecipeInput = {
    slug: string;
}
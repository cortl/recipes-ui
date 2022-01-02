import { SortDirection } from "../../types/resolvers"

const byNumber = (a: number, b: number, direction: SortDirection) =>
    direction === SortDirection.ASC
        ? a - b
        : b - a;

const byString = (a: string, b: string, direction: SortDirection) => {
    const upperA = a.toUpperCase();
    const upperB = b.toUpperCase();


    if (upperA < upperB) {
        return direction === SortDirection.ASC
            ? -1
            : 1;
    }
    if (upperA > upperB) {
        return direction === SortDirection.ASC
            ? 1
            : -1;
    }

    return 0;
}

const sortByField = (field: string, direction: SortDirection) => (a: any, b: any) => {
    const aField = a[field];
    const bField = b[field];

    if (typeof aField === 'number') {
        return byNumber(aField, bField, direction);
    } else {
        return byString(aField, bField, direction);
    }
}

export { sortByField }
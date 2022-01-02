import { ArrayFilter, BooleanFilter, NumberFilter } from "../../../types/resolvers";

const getKeyValue = <U extends keyof T, T extends object>(key: U, obj: T) => obj[key];

const filterBoolean = (value: boolean | undefined | null, filter: BooleanFilter) => {
    let keep = true;

    if (filter.hasOwnProperty('exists')) {
        keep = keep && filter.exists
            ? value != null
            : value == null;
    }

    if (filter.hasOwnProperty('is')) {
        keep = keep && Boolean(value) === filter.is
    }

    return keep;
}

const filterArray = (value: any[], filter: ArrayFilter) => {
    let keep = true;

    if (filter.hasOwnProperty('exists')) {
        keep = keep && filter.exists
            ? value != null
            : value == null;
    }

    if (filter.hasOwnProperty('in')) {
        keep = keep && filter.in.every(filterValue => value.some(valueToCompare => valueToCompare === filterValue))
    }

    return keep;
}

const filterNumber = (value: number, filter: NumberFilter) => {
    let keep = true;

    if (filter.hasOwnProperty('exists')) {
        keep = keep && filter.exists
            ? value != null
            : value == null;
    }

    if (filter.hasOwnProperty('gt')) {
        keep = keep && value > filter.gt;
    }

    if (filter.hasOwnProperty('lt')) {
        keep = keep && value < filter.lt;
    }

    if (filter.hasOwnProperty('eq')) {
        keep = keep && filter.eq === value;
    }

    return keep;
}

export { getKeyValue, filterBoolean, filterArray, filterNumber };
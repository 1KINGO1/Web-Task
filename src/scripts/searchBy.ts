import {SerializedUser} from "./types/SerializedUser";

export interface SearchParam {
    key: keyof SerializedUser;
    lessThan?: number | string;
    greaterThan?: number | string;
    equals?: number | string | boolean;
    lessThanEquals?: number | string;
    greaterThanEquals?: number | string;
}

export function searchOneBy(users: SerializedUser[], params: SearchParam[]): SerializedUser | null{
    return users.find(user => {
        return params.every(param => {
            const value = user[param.key] as any;
            if (param.lessThan && param.lessThan <= value) return false;
            if (param.greaterThan && param.greaterThan >= value) return false;
            if (param.equals && param.equals !== value) return false;
            if (param.lessThanEquals && param.lessThanEquals < value) return false;
            if (param.greaterThanEquals && param.greaterThanEquals > value) return false;
            return true;
        });
    }) ?? null
}

export function searchManyBy(users: SerializedUser[], params: SearchParam[]): SerializedUser[] {
    return users.filter(user => {
        return params.every(param => {
            const value = user[param.key] as any;
            if (param.lessThan && param.lessThan <= value) return false;
            if (param.greaterThan && param.greaterThan >= value) return false;
            if (param.equals && param.equals !== value) return false;
            if (param.lessThanEquals && param.lessThanEquals < value) return false;
            if (param.greaterThanEquals && param.greaterThanEquals > value) return false;
            return true;
        });
    });
}

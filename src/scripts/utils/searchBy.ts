import {SerializedUser} from "../types/SerializedUser";

export interface SearchParam {
    key: keyof SerializedUser;
    lessThan?: number | string;
    greaterThan?: number | string;
    equals?: number | string | boolean;
    lessThanEquals?: number | string;
    greaterThanEquals?: number | string;
    has?: boolean;
}

export function searchOneBy(users: SerializedUser[], params: SearchParam[]): SerializedUser | null{
    return users.find(user => {
        return params.every(param => {
            const value = user[param.key] as any;
            if (param.lessThan !== undefined && param.lessThan <= value) return false;
            if (param.has !== undefined && value == null) return false;
            if (param.greaterThan !== undefined && param.greaterThan >= value) return false;
            if (param.equals !== undefined && param.equals !== value) return false;
            if (param.lessThanEquals !== undefined && param.lessThanEquals < value) return false;
            if (param.greaterThanEquals !== undefined && param.greaterThanEquals > value) return false;
            return true;
        });
    }) ?? null
}

export function searchManyBy(users: SerializedUser[], params: SearchParam[]): SerializedUser[] {
    return users.filter(user => {
        return params.every(param => {
            const value = user[param.key] as any;
            if (param.has !== undefined && value == null) return false;
            if (param.lessThan !== undefined && param.lessThan <= value) return false;
            if (param.greaterThan !== undefined && param.greaterThan >= value) return false;
            if (param.equals !== undefined && param.equals !== value) return false;
            if (param.lessThanEquals !== undefined && param.lessThanEquals < value) return false;
            if (param.greaterThanEquals !== undefined && param.greaterThanEquals > value) return false;
            return true;
        });
    });
}

export function searchManyByValue(users: SerializedUser[], value: string): SerializedUser[] {
    return users.filter(user => {
        return user.full_name?.toLowerCase().includes(value.toLowerCase()) ||
            user.age?.toString() === value ||
            user.note?.includes(value.toLowerCase())
    });
}

import _ from 'lodash';
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

export function searchOneBy(users: SerializedUser[], params: SearchParam[]): SerializedUser | null {
    return _.find(users, (user) => {
        return _.every(params, (param) => {
            const value = _.get(user, param.key);

            // Check if the key exists based on the 'has' parameter
            if (param.has !== undefined && ((param.has && value == null) || (!param.has && value != null))) {
                return false;
            }

            if (param.lessThan !== undefined && _.lte(param.lessThan, value)) return false;
            if (param.greaterThan !== undefined && _.gte(param.greaterThan, value)) return false;
            if (param.equals !== undefined && !_.isEqual(param.equals, value)) return false;
            if (param.lessThanEquals !== undefined && _.lt(param.lessThanEquals, value)) return false;
            if (param.greaterThanEquals !== undefined && _.gt(param.greaterThanEquals, value)) return false;

            return true;
        });
    }) ?? null;
}

export function searchManyBy(users: SerializedUser[], params: SearchParam[]): SerializedUser[] {
    return _.filter(users, (user) => {
        return _.every(params, (param) => {
            const value = _.get(user, param.key);

            // Check if the key exists based on the 'has' parameter
            if (param.has !== undefined && ((param.has && value == null) || (!param.has && value != null))) {
                return false;
            }

            if (param.lessThan !== undefined && _.lte(param.lessThan, value)) return false;
            if (param.greaterThan !== undefined && _.gte(param.greaterThan, value)) return false;
            if (param.equals !== undefined && !_.isEqual(param.equals, value)) return false;
            if (param.lessThanEquals !== undefined && _.lt(param.lessThanEquals, value)) return false;
            if (param.greaterThanEquals !== undefined && _.gt(param.greaterThanEquals, value)) return false;

            return true;
        });
    });
}

export function searchManyByValue(users: SerializedUser[], value: string): SerializedUser[] {
    const lowerValue = value.toLowerCase();

    return _.filter(users, (user) => {
        return _.some([
            _.toLower(_.get(user, 'full_name', '') ?? undefined).includes(lowerValue),
            _.toString(_.get(user, 'age') ?? undefined).includes(value),
            _.toLower(_.get(user, 'note', '') ?? undefined).includes(lowerValue)
        ]);
    });
}

import { TokensType } from '../../types';
import _ from 'lodash';
import { getTokenTypesToApplyFn } from '../../libs/apply-on-types';
import { flattenObject } from '../../libs/flatten-deep';

export type InputDataType = Array<object & { type?: TokensType }>;
export type OptionsType<T extends InputDataType[0]> = {
  keys: Array<keyof T>;
  filter?: {
    types: Array<TokensType>;
  };
  flatten?: boolean;
};

export function pick<T extends InputDataType>(tokens: T, options: OptionsType<T[0]>) {
  try {
    const typesToApplyFn = getTokenTypesToApplyFn(options);
    return tokens.map<T[0]>(token => {
      if ('type' in token && typesToApplyFn.includes(token.type!)) {
        const obj = _.pick(token, ...options.keys);
        return options.flatten ? flattenObject(obj) : obj;
      }
      return token;
    });
  } catch (err) {
    throw err;
  }
}

import { LibsType } from '../global-libs';

export type InputDataType = Array<Record<string, any>>;
export type OutputDataType = Promise<InputDataType>;
export type OptionsType =
  | undefined
  | {
      keys: Array<string>;
    };

export default async function (
  tokens: InputDataType,
  options: OptionsType = { keys: ['name'] },
  { _ }: Pick<LibsType, '_'>,
): OutputDataType {
  try {
    return tokens.map(token => {
      options.keys.forEach(key => {
        if (_.has(token, key))
          _.set(token, key, _.flow(_.camelCase, _.upperFirst)(_.get(token, key)));
      });
      return token;
    });
  } catch (err) {
    throw err;
  }
}

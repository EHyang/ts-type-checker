import * as Validate from './validator.interface';

export function Validator<T extends {} = { [key: string]: string }>(body: T) {
  const ValidatorKeys: string[] = Object.keys(body);

  const data: T & Validate.Validator = {
    ...body,
    isNumber(...target: string[]) {
      const isAll = target.length === 0;

      ValidatorKeys.forEach((key) => {
        if (isAll || target.includes(key)) {
          console.log('isNumber', key, body[key as keyof T]);
          if (typeof body[key as keyof T] !== 'number') {
            throw new Validate.ValidationError('Invalid Type', key, body[key as keyof T]);
          }
        }
      });

      return data;
    },

    isString(...target: string[]) {
      const isAll = target.length === 0;

      ValidatorKeys.forEach((key) => {
        if (isAll || target.includes(key)) {
          console.log('isString', key, body[key as keyof T]);
          if (typeof body[key as keyof T] !== 'string') {
            throw new Validate.ValidationError('Invalid Type', key, body[key as keyof T]);
          }
        }
      });

      return data;
    },
  };

  ValidatorKeys.forEach((key) => {
    if (body[key as keyof T] === undefined || body[key as keyof T] === null) {
      throw new Validate.ValidationError('Empty', key, body[key as keyof T]);
    }
    console.log('Not Empty', key, body[key as keyof T]);
  });

  return data;
}

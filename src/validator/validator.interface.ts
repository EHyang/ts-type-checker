export interface Validator {
  isNumber(...data: string[]): any;
  isString(...data: string[]): any;
}

export class ValidationError extends Error {
  constructor(target: 'Invalid Type' | 'Empty', key: string, value: any) {
    super(`${target} Error. On ${key} , input ${value}`);

    this.name = 'ValidationError';
  }
}

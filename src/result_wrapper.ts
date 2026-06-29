import { isError, isSuccess, Result, unwrapOr, unwrapOrThrow } from "./result";

/**
 * @template DataType The type of the successful result.
 * @template ErrorType The type of the error returned when the operation fails.
 */
export class ResultWrapper<DataType, ErrorType> {
  constructor(private readonly result: Result<DataType, ErrorType>) {}
  public unwrap_or(defaultValue: DataType): DataType {
    return unwrapOr(this.result, defaultValue);
  }
  public unwrap(): DataType {
    return unwrapOrThrow(this.result);
  }
  public is_ok(): boolean {
    return isSuccess(this.result);
  }
  public is_err(): boolean {
    return isError(this.result);
  }
  public expect(message: string): DataType {
    if (isError(this.result)) {
      throw new Error(message, { cause: this.result.error });
    }
    return this.result.data;
  }
}

/**
 * @template DataType The type of the successful result.
 * @template ErrorType The type of the error returned when the operation fails.
 */
export const resultify = <T, E>(result: Result<T, E>) =>
  new ResultWrapper(result);

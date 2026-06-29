/**
 * Represents the outcome of an operation that can either succeed with a value
 * or fail with an error.
 *
 * This type is a discriminated union using the `success` property, allowing
 * TypeScript to automatically narrow the type based on its value.
 *
 * @template DataType The type of the successful result.
 * @template ErrorType The type of the error returned when the operation fails.
 *
 * @example
 * ```ts
 * const result: Result<number, string> = {
 *   success: true,
 *   data: 42,
 * };
 *
 * if (result.success) {
 *   // result is { success: true; data: number }
 *   console.log(result.data);
 * } else {
 *   // result is { success: false; error: string }
 *   console.error(result.error);
 * }
 * ```
 *
 * @example
 * ```ts
 * type ParseError = {
 *   code: "INVALID_JSON";
 *   message: string;
 * };
 *
 * function parseJson(text: string): Result<unknown, ParseError> {
 *   try {
 *     return {
 *       success: true,
 *       data: JSON.parse(text),
 *     };
 *   } catch {
 *     return {
 *       success: false,
 *       error: {
 *         code: "INVALID_JSON",
 *         message: "Failed to parse JSON.",
 *       },
 *     };
 *   }
 * }
 * ```
 */
type Result<DataType, ErrorType> =
  | {
      /** Indicates the operation completed successfully. */
      success: true;

      /** The value produced by the successful operation. */
      data: DataType;
    }
  | {
      /** Indicates the operation failed. */
      success: false;

      /** The error describing why the operation failed. */
      error: ErrorType;
    };

/**
 * Returns whether a {@link Result} represents a successful operation.
 *
 * @param result The result to check.
 * @returns `true` if the result is successful; otherwise `false`.
 */
const isSuccess = (
  result: Result<unknown, unknown>,
): result is { success: true; data: unknown } => {
  return result.success === true;
};

/**
 * Returns the contained value regardless of whether the operation succeeded.
 *
 * If the result is successful, the returned value is the success data.
 * Otherwise, the returned value is the error.
 *
 * @template T The success value type.
 * @template E The error type.
 * @param result The result to unwrap.
 * @returns The success data or the error.
 */
function unwrap<T, E>(result: Result<T, E>): T | E {
  if (isSuccess(result)) return result.data;
  else return result.error;
}

/**
 * Returns the success value or a default value if the result is an error.
 *
 * @template T The success value type.
 * @param result The result to unwrap.
 * @param defaultValue The value to return if the result is an error.
 * @returns The success data or the provided default value.
 */
function unwrapOr<T>(result: Result<T, unknown>, defaultValue: T): T {
  return isSuccess(result) ? result.data : defaultValue;
}

/**
 * Returns the success value or `null` if the result is an error.
 *
 * @template T The success value type.
 * @param result The result to unwrap.
 * @returns The success data or `null`.
 */
function safeUnwrap<T>(result: Result<T, unknown>): T | null {
  return unwrapOr(result, null);
}

/**
 * Returns whether a {@link Result} represents a failed operation.
 *
 * @param result The result to check.
 * @returns `true` if the result is an error; otherwise `false`.
 */
const isError = (
  result: Result<unknown, unknown>,
): result is { success: false; error: unknown } => {
  return result.success === false;
};

/**
 * Returns the success value or throws the contained error.
 *
 * @template T The success value type.
 * @param result The result to unwrap.
 * @returns The success data.
 * @throws The contained error if the result represents a failure.
 */
function unwrapOrThrow<T>(result: Result<T, unknown>): T {
  if (isError(result)) throw result.error;
  else return result.data;
}

export { Result, unwrap, unwrapOr, unwrapOrThrow, safeUnwrap, isSuccess, isError };

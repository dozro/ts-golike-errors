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
export type Result<DataType, ErrorType> =
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

import { Result } from "./result";

export function ThrowableResultPacker() {
  return function <This, Args extends any[], Return>(
    originalMethod: (...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (...args: Args) => Return>,
  ): (...args: Args) => Result<Return, Error> {
    return function (this: This, ...args: Args): Result<Return, Error> {
      try {
        const result = originalMethod.apply(this, args);
        return { success: true, data: result };
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err : new Error(String(err)),
        };
      }
    };
  };
}

export function packThrowable<Args extends any[], Return>(
  fn: (...args: Args) => Return,
): (...args: Args) => Result<Return, Error> {
  return function (...args: Args): Result<Return, Error> {
    try {
      return { success: true, data: fn(...args) };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err : new Error(String(err)),
      };
    }
  };
}

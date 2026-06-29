import { describe, it, expect } from "vitest";
import { $unwrapOrNull, $unwrapOr } from "./macros";
import { Result } from "./result";

describe("$unwrapOrNull", () => {
  it("returns data when result is success", () => {
    const result: Result<number, Error> = { success: true, data: 42 };

    expect($unwrapOrNull(result)).toBe(42);
  });

  it("returns null when result is failure", () => {
    const result: Result<number, Error> = {
      success: false,
      error: new Error("fail"),
    };

    expect($unwrapOrNull(result)).toBeNull();
  });

  it("ignores data when success is false even if data exists", () => {
    const result = {
      success: false,
      data: "should-not-be-used",
      error: "x",
    } as any;

    expect($unwrapOrNull(result)).toBeNull();
  });
});

describe("$unwrapOr", () => {
  it("returns data when result is success", () => {
    const result: Result<string, string> = { success: true, data: "ok" };

    expect($unwrapOr(result, "default")).toBe("ok");
  });

  it("returns default value when result is failure", () => {
    const result: Result<string, string> = {
      success: false,
      error: "boom",
    };

    expect($unwrapOr(result, "default")).toBe("default");
  });

  it("returns default value even if falsy values are used", () => {
    const result: Result<string, string> = {
      success: false,
      error: "error",
    };

    expect($unwrapOr(result, "")).toBe("");
  });
});

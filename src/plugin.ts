import { createUnplugin } from "unplugin";

export const ResultMacros = createUnplugin(() => {
  return {
    name: "result-macros",

    transform(code) {
      let out = code;

      out = out.replace(
        /\$unwrapOrNull\(([^)]+)\)/g,
        (_, value) =>
          `(${value}.success ? ${value}.data : null)`
      );

      out = out.replace(
        /\$unwrapOr\(([^,]+),\s*([^)]+)\)/g,
        (_, value, fallback) =>
          `(${value}.success ? ${value}.data : ${fallback})`
      );

      return out === code ? null : out;
    },
  };
});
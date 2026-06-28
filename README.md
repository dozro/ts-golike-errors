# Go-like errors

a foolish approach to error handling utilizing typescript.

## examples

```typescript
const result: Result<number, string> = {
   success: true,
   data: 42,
};

if (result.success) {
    // result is { success: true; data: number }
    console.log(result.data);
} else {
    // result is { success: false; error: string }
    console.error(result.error);
}
```

or 

```typescript
type ParseError = {
    code: "INVALID_JSON";
    message: string;
};

function parseJson(text: string): Result<unknown, ParseError> {
    try {
        return {
            success: true,
            data: JSON.parse(text),
        };
    } catch {
        return {
            success: false,
            error: {
                code: "INVALID_JSON",
                message: "Failed to parse JSON.",
            },
        };
    }
 }
```

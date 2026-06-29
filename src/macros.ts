import { Result } from "./result";

export function $unwrapOrNull<DataType>(value: Result<DataType, unknown>){
    return value.success ? value.data : null
}

export function $unwrapOr<DataType>(value: Result<DataType, unknown>, defaultValue: DataType){
    return value.success ? value.data : defaultValue;
}
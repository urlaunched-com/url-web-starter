import { FieldValues, SubmitHandler } from "react-hook-form";

export interface IFromProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  defaultValues?: Partial<T>;
  className?: string;
}

import { HTMLProps, InputHTMLAttributes, PropsWithoutRef, TextareaHTMLAttributes } from "react";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

export enum E_FORM_ITEM_TYPES {
  INPUT = "input",
  TEXTAREA = "textarea"
}

export interface IRegister<T extends FieldValues> {
  register: ReturnType<UseFormRegister<T>>;
}

export interface IFormItemProps<T extends FieldValues> extends HTMLProps<HTMLInputElement | HTMLTextAreaElement> {
  blockClassName?: string;
  itemClassName?: string;
  label?: string;
  variant: E_FORM_ITEM_TYPES;
  name: Path<T>;
  options?: RegisterOptions<T, any>;
  type?: "text" | "password" | "email" | "radio" | "checkbox";
}

export interface IInputProps<T extends FieldValues>
  extends PropsWithoutRef<InputHTMLAttributes<HTMLInputElement>>,
    IRegister<T> {
  isCheckbox?: boolean;
}

export interface ITextareaProps<T extends FieldValues>
  extends PropsWithoutRef<TextareaHTMLAttributes<HTMLTextAreaElement>>,
    IRegister<T> {}

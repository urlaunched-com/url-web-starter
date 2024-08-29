"use client";

import classNames from "classnames";
import { ComponentType } from "react";
import { useFormContext } from "react-hook-form";

import { createBem } from "@/shared";

import { Input } from "../input";
import { Textarea } from "../textarea";

import styles from "./form-item.module.scss";
import { E_FORM_ITEM_TYPES, IFormItemProps, IInputProps, ITextareaProps } from "./form-item.types";

const componentMap = {
  [E_FORM_ITEM_TYPES.INPUT]: Input,
  [E_FORM_ITEM_TYPES.TEXTAREA]: Textarea,
};

const FormItem = <T extends Record<string, any>>({
  label,
  blockClassName,
  variant,
  itemClassName,
  name,
  options = {},
  ...props
}: IFormItemProps<T>) => {
  const bem = createBem("form-item", styles);
  const Item = componentMap[variant] as ComponentType<IInputProps<T> | ITextareaProps<T>>;
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  if (!Item) {
    console.warn(`Form item with type ${variant} not found`);
    return null;
  }
  const extraStyles = {
    [bem("checkbox-input")]: props.type === "checkbox",
    [bem("radio-input")]: props.type === "radio",
  };

  return (
    <label className={classNames(bem(""), blockClassName)}>
      {label && <span className={bem("text")}>{label}</span>}
      <Item {...props} className={classNames(extraStyles, itemClassName)} register={{ ...register(name, options) }} />
      {props.type === "checkbox" && <span className={bem("checkbox-element")} />}
      {props.type === "radio" && <span className={bem("radio-element")} />}
      {errors[name] && typeof errors[name]?.message === "string" && (
        <span className={bem("error")}>{`${errors[name]?.message}`}</span>
      )}
    </label>
  );
};

export default FormItem;

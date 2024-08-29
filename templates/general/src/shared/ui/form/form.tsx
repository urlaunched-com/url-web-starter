import classNames from "classnames";
import { PropsWithChildren } from "react";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";

import { createBem } from "@/shared";

import styles from "./form.module.scss";
import { IFromProps } from "./form.types";

const Form = <T extends Record<string, any>>({
  children,
  onSubmit,
  defaultValues,
  className,
  ...props
}: PropsWithChildren<
  IFromProps<T> & {
    defaultValues?: DefaultValues<T>;
  }
>) => {
  const bem = createBem("form", styles);
  const methods = useForm<T>({ defaultValues });
  return (
    <FormProvider {...methods}>
      <form className={classNames(bem(""), className)} {...props} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;

// Example of usage:
/**
 * interface FormData {
 *   email: string;
 *   password: string;
 *   message: string;
 * }
 *
 *  <Form<FormData> onSubmit={e => console.log(e)}>
 *    <FormItem<FormData> type={E_FORM_ITEM_TYPES.INPUT} name={"email"} placeholder={"Email"} />
 *    <FormItem<FormData> type={E_FORM_ITEM_TYPES.INPUT} name={"password"} placeholder={"Password"} />
 *    <FormItem<FormData> type={E_FORM_ITEM_TYPES.TEXTAREA} name={"message"} placeholder={"Message"} />
 *    <Button text={"Submit"} type={"submit"} />
 *  </Form>
 */

"use client";

import { FC } from "react";

import { Button, E_FORM_ITEM_TYPES, Form, FormItem } from "@/shared";

interface FormData {
  email: string;
  password: string;
  message: string;
  privacy: boolean;
}

const HomeView: FC = () => {
  return (
    <Form<FormData> onSubmit={e => console.log(e)}>
      <FormItem<FormData>
        variant={E_FORM_ITEM_TYPES.INPUT}
        name="email"
        placeholder="Email"
        options={{
          required: "Email is required",
        }}
      />
      <FormItem<FormData> variant={E_FORM_ITEM_TYPES.INPUT} name="password" placeholder="Password" />
      <FormItem<FormData> label="Are tou sure?" variant={E_FORM_ITEM_TYPES.INPUT} name="privacy" type="radio" />
      <FormItem<FormData> variant={E_FORM_ITEM_TYPES.TEXTAREA} name="message" placeholder="Message" />
      <Button text="Submit" type="submit" disabled />
    </Form>
  );
};

export default HomeView;

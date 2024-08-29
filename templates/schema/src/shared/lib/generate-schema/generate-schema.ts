import { Thing, WithContext } from "schema-dts";

const generateSchema = (schema: Thing): WithContext<Thing> => {
  if (typeof schema !== "object" || schema === null) {
    throw new Error("Schema must be an object");
  }

  return {
    "@context": "https://schema.org",
    ...schema,
  };
};

export default generateSchema;

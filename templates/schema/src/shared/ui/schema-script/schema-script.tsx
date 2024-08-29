"use client";

import Script from "next/script";
import { FC } from "react";

import { generateSchema } from "../../lib";

import { ISchemaScriptProps } from "./schema-script.types";

const SchemaScript: FC<ISchemaScriptProps> = ({ schema, id }) => {
  const jsonLd = JSON.stringify(generateSchema(schema));
  return <Script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />;
};

export default SchemaScript;

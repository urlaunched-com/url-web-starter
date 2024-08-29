"use client";

import classNames from "classnames";
import dynamic from "next/dynamic";
import { ComponentType, FC, memo, useEffect, useState } from "react";

import { createBem } from "@/shared";

import styles from "./icon.module.scss";
import { IIconProps } from "./icon.types";

const Icon: FC<IIconProps> = ({ name, folder = "", className, onClick, ...props }) => {
  const bem = createBem("icon", styles);
  const [Svg, setSvg] = useState<ComponentType | null>(null);
  const [prevName, setPrevName] = useState(name);
  const [prevFolder, setPrevFolder] = useState(folder);

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const importedModule = await import(`@/public/assets/icons/${folder ? `${folder}/` : ""}${name}.svg`);
        setSvg(() => importedModule.default);
        setPrevName(name);
        setPrevFolder(folder);
      } catch (error) {
        console.warn(`Icon ${name} not found`);
        setSvg(null);
      }
    };
    loadSvg();
  }, [name, folder]);

  const DynamicSvg = dynamic(() =>
    import(`@/public/assets/icons/${folder ? `${folder}/` : ""}${name}.svg`)
      .then(module => module.default)
      .catch(() => {
        console.warn(`Icon ${name} not found`);
      })
  );

  return (
    <div onClick={onClick} className={classNames(bem(""), className)}>
      {Svg ? <Svg {...props} /> : <DynamicSvg {...props} />}
    </div>
  );
};

export default memo(Icon);

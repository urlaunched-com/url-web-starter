export type Classes = Record<string, string> | null | "";

type BemElement<T> = T | "" | undefined | null;

type BemModifierObject = Record<string, string | number | boolean | undefined | null>;

type BemModifierArray = (string | number | boolean | null | undefined)[];

type BemModifier = string | number | BemModifierObject | BemModifierArray | "" | undefined | null;

type BemMix = string | undefined | (string | undefined)[];

export enum BEM_MODIFIER_TYPE {
  MODIFIER_KEY_DIVIDER = "--",
  MODIFIER_VALUE_DIVIDER = "-"
}

export interface BemClassNameCreator {
  (element?: BemElement<string>, modifier?: BemModifier, mix?: BemMix): string;
}

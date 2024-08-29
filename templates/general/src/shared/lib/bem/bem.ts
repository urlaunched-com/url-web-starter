import { createBem as originalCreateBem } from "@mukhindev/create-bem";

import { BEM_MODIFIER_TYPE, BemClassNameCreator, Classes } from "./bem.types";

const customCreateBem = (block: string, classes: Classes | undefined): BemClassNameCreator =>
  originalCreateBem(block, classes, {
    modifierKeyDivider: BEM_MODIFIER_TYPE.MODIFIER_KEY_DIVIDER,
    modifierValueDivider: BEM_MODIFIER_TYPE.MODIFIER_VALUE_DIVIDER,
  });

export { customCreateBem as createBem };

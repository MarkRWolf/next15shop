import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";

import { orderType } from "./orderType";
import { salesType } from "./salesType";
import { langType } from "./langType";
import { textType } from "./textType";
import { langsType } from "./langsType";
import { productType } from "./productType";
import { colorsType } from "./colorsType";
import { productTypeNew } from "./productTypeNew";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    langsType,
    categoryType,
    /*     productType,
     */ productTypeNew,
    orderType,
    salesType,
    langType,
    textType,
    colorsType,
  ],
};

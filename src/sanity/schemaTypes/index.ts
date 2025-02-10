import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";

import { orderType } from "./orderType";
import { salesType } from "./salesType";
import { langType } from "./langType";
import { textType } from "./textType";
import { colorsType } from "./colorsType";
import { productType } from "./productType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    productType,
    orderType,
    salesType,
    langType,
    textType,
    colorsType,
  ],
};

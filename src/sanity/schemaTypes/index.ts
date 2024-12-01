import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";

import { productType } from "./productType";
import { orderType } from "./orderType";
import { salesType } from "./salesType";
import { langType } from "./langType";
import { textType } from "./textType";
import { langsType } from "./langsType";
import { producttestType } from "./producttestType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    langsType,
    categoryType,
    productType,
    producttestType,
    orderType,
    salesType,
    langType,
    textType,
  ],
};

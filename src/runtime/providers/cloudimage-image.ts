import { joinURL, encodeQueryItem } from "ufo";
import type { ProviderGetImage } from '../../types'
import { createOperationsGenerator } from '#image'

const operationsGenerator = createOperationsGenerator({
  keyMap: {
    width: "w",
    height: "h",
    dpr: "dpr",
    fit: "fit",
    gravity: "g",
    quality: "q",
    format: "f",
    sharpen: "sharpen",
  },
  valueMap: {
    fit: {
      cover: "cover",
      contain: "contain",
      fill: "scale-down",
      outside: "crop",
      inside: "pad",
    },
    gravity: {
      auto: "auto",
      side: "side",
    },
  },
  joinWith: ",",
  formatter: (key, val) => encodeQueryItem(key, val),
});

const defaultModifiers = {};

export const getImage: ProviderGetImage = (
  src,
  { modifiers = {}, baseURL = "/" } = {}
) => {
  const mergeModifiers = { ...defaultModifiers, ...modifiers };
  const operations = operationsGenerator(mergeModifiers as any);

  const url = operations
    ? joinURL(baseURL, src, operations)
    : joinURL(baseURL, src);

  return {
    url,
  };
};

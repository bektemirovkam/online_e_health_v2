import sha1 from "sha1";
import sha256 from "sha256";
import base64 from "base-64";
import utf8 from "utf8";

export const formatter = {
  toBase64: (str: string) => {
    const utf8Bytes = utf8.encode(str);
    const encoded = base64.encode(utf8Bytes);
    return encoded;
  },

  toSHA256: async (str: string) => {
    const hash = await sha256(str);
    return hash;
  },

  toSHA1: async (str: string) => {
    const hash = await sha1(str);
    return hash;
  },
};

import { Codec, GetType, Left, string } from "purify-ts";

export const JsonFromString = <JC extends Codec<any>>(jsonCodec: JC) =>
  Codec.custom<GetType<JC>>({
    decode: (value) =>
      string.decode(value).chain((s) => {
        try {
          const parsed = JSON.parse(s);
          return jsonCodec.decode(parsed);
        } catch (e) {
          return Left(e);
        }
      }),
    encode: (value) => JSON.stringify(value),
  });

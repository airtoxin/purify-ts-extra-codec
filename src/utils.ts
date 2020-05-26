import { Codec, Either } from "purify-ts/es";

export const extendCodec = <T>(
  base: Codec<T>,
  decoder: (value: T) => Either<string, T>
): Codec<T> =>
  Codec.custom<T>({
    decode: (value) => base.decode(value).chain(decoder),
    encode: base.encode,
  });

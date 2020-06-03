import { Codec, Either } from "purify-ts";

export const extendCodec = <T>(
  base: Codec<T>,
  ...decoders: Array<(value: T) => Either<string, T>>
): Codec<T> => {
  return Codec.custom<T>({
    decode: (value) =>
      (decoders ?? []).reduce(
        (decoded, decoder) => decoded.chain(decoder),
        base.decode(value)
      ),
    encode: base.encode,
  });
};

export function chainCodec<T1>(c1: Codec<T1>): Codec<T1>;
export function chainCodec<T1, T2>(c1: Codec<T1>, c2: Codec<T2>): Codec<T2>;
export function chainCodec<T1, T2, T3>(
  c1: Codec<T1>,
  c2: Codec<T2>,
  c3: Codec<T3>
): Codec<T3>;
export function chainCodec<T1, T2, T3, T4>(
  c1: Codec<T1>,
  c2: Codec<T2>,
  c3: Codec<T3>,
  c4: Codec<T4>
): Codec<T4>;
export function chainCodec<T1, T2, T3, T4, T5>(
  c1: Codec<T1>,
  c2: Codec<T2>,
  c3: Codec<T3>,
  c4: Codec<T4>,
  c5: Codec<T5>
): Codec<T5>;
export function chainCodec<T1, T2, T3, T4, T5, T6>(
  c1: Codec<T1>,
  c2: Codec<T2>,
  c3: Codec<T3>,
  c4: Codec<T4>,
  c5: Codec<T5>,
  c6: Codec<T6>
): Codec<T6>;
export function chainCodec<T1, T2, T3, T4, T5, T6, T7>(
  c1: Codec<T1>,
  c2: Codec<T2>,
  c3: Codec<T3>,
  c4: Codec<T4>,
  c5: Codec<T5>,
  c6: Codec<T6>,
  c7: Codec<T7>
): Codec<T7>;
export function chainCodec<T1, T2, T3, T4, T5, T6, T7, T8>(
  c1: Codec<T1>,
  c2: Codec<T2>,
  c3: Codec<T3>,
  c4: Codec<T4>,
  c5: Codec<T5>,
  c6: Codec<T6>,
  c7: Codec<T7>,
  c8: Codec<T8>
): Codec<T8>;
export function chainCodec<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  c1: Codec<T1>,
  c2: Codec<T2>,
  c3: Codec<T3>,
  c4: Codec<T4>,
  c5: Codec<T5>,
  c6: Codec<T6>,
  c7: Codec<T7>,
  c8: Codec<T8>,
  c9: Codec<T9>
): Codec<T9>;
export function chainCodec<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  c1: Codec<T1>,
  c2?: Codec<T2>,
  c3?: Codec<T3>,
  c4?: Codec<T4>,
  c5?: Codec<T5>,
  c6?: Codec<T6>,
  c7?: Codec<T7>,
  c8?: Codec<T8>,
  c9?: Codec<T9>
):
  | Codec<T1>
  | Codec<T2>
  | Codec<T3>
  | Codec<T4>
  | Codec<T5>
  | Codec<T6>
  | Codec<T7>
  | Codec<T8>
  | Codec<T9> {
  if (!c2) return c1;
  if (!c3) {
    return Codec.custom<T2>({
      decode: (value) => c1.decode(value).chain(c2.decode),
      encode: (value) => c1.encode(c2.encode(value) as any),
    });
  }
  if (!c4) {
    return Codec.custom<T3>({
      decode: (value) => c1.decode(value).chain(c2.decode).chain(c3.decode),
      encode: (value) => c1.encode(c2.encode(c3.encode(value) as any) as any),
    });
  }
  if (!c5) {
    return Codec.custom<T4>({
      decode: (value) =>
        c1.decode(value).chain(c2.decode).chain(c3.decode).chain(c4.decode),
      encode: (value) =>
        c1.encode(c2.encode(c3.encode(c4.encode(value) as any) as any) as any),
    });
  }
  if (!c6) {
    return Codec.custom<T5>({
      decode: (value) =>
        c1
          .decode(value)
          .chain(c2.decode)
          .chain(c3.decode)
          .chain(c4.decode)
          .chain(c5.decode),
      encode: (value) =>
        c1.encode(
          c2.encode(
            c3.encode(c4.encode(c5.encode(value) as any) as any) as any
          ) as any
        ),
    });
  }
  if (!c7) {
    return Codec.custom<T6>({
      decode: (value) =>
        c1
          .decode(value)
          .chain(c2.decode)
          .chain(c3.decode)
          .chain(c4.decode)
          .chain(c5.decode)
          .chain(c6.decode),
      encode: (value) =>
        c1.encode(
          c2.encode(
            c3.encode(
              c4.encode(c5.encode(c6.encode(value) as any) as any) as any
            ) as any
          ) as any
        ),
    });
  }
  if (!c8) {
    return Codec.custom<T7>({
      decode: (value) =>
        c1
          .decode(value)
          .chain(c2.decode)
          .chain(c3.decode)
          .chain(c4.decode)
          .chain(c5.decode)
          .chain(c6.decode)
          .chain(c7.decode),
      encode: (value) =>
        c1.encode(
          c2.encode(
            c3.encode(
              c4.encode(
                c5.encode(c6.encode(c7.encode(value) as any) as any) as any
              ) as any
            ) as any
          ) as any
        ),
    });
  }
  if (!c9) {
    return Codec.custom<T8>({
      decode: (value) =>
        c1
          .decode(value)
          .chain(c2.decode)
          .chain(c3.decode)
          .chain(c4.decode)
          .chain(c5.decode)
          .chain(c6.decode)
          .chain(c7.decode)
          .chain(c8.decode),
      encode: (value) =>
        c1.encode(
          c2.encode(
            c3.encode(
              c4.encode(
                c5.encode(
                  c6.encode(c7.encode(c8.encode(value) as any) as any) as any
                ) as any
              ) as any
            ) as any
          ) as any
        ),
    });
  }

  return Codec.custom<T9>({
    decode: (value) =>
      c1
        .decode(value)
        .chain(c2.decode)
        .chain(c3.decode)
        .chain(c4.decode)
        .chain(c5.decode)
        .chain(c6.decode)
        .chain(c7.decode)
        .chain(c8.decode)
        .chain(c9.decode),
    encode: (value) =>
      c1.encode(
        c2.encode(
          c3.encode(
            c4.encode(
              c5.encode(
                c6.encode(
                  c7.encode(c8.encode(c9.encode(value) as any) as any) as any
                ) as any
              ) as any
            ) as any
          ) as any
        ) as any
      ),
  });
}

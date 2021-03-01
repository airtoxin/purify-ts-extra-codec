import { Codec, GetType } from "purify-ts";

export const Interface = <T extends Record<string, Codec<any>>>(
  properties: T
): Codec<
  {
    [K in keyof ({
      [K in keyof Pick<
        T,
        {
          [K in keyof T]-?: undefined extends GetType<T[K]> ? never : K;
        }[keyof T]
      >]: GetType<T[K]>;
    } &
      {
        [K in keyof Pick<
          T,
          {
            [K in keyof T]-?: undefined extends GetType<T[K]> ? K : never;
          }[keyof T]
        >]?: Exclude<GetType<T[K]>, undefined>;
      })]: GetType<T[K]>;
  }
> => Codec.interface(properties) as any;

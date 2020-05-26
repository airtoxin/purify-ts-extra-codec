import { chainCodec, extendCodec } from "./utils";
import { Codec, Left, number, Right, string } from "purify-ts/es";

export type NumberRangeOption = {
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
};

export const NumberRangedIn = ({ gt, gte, lt, lte }: NumberRangeOption) =>
  extendCodec<number>(number, (value) => {
    if (gt != null && !(gt < value))
      return Left(`${value} must be greater than ${gt}`);
    if (gte != null && !(gte <= value))
      return Left(`${value} must be greater than equal ${gte}`);
    if (lt != null && !(lt > value))
      return Left(`${value} must be less than ${lt}`);
    if (lte != null && !(lte >= value))
      return Left(`${value} must be less than equal ${lte}`);
    return Right(value);
  });

export const NumberFromString = Codec.custom<number>({
  decode: (value) =>
    string.decode(value).chain((value) => {
      const num = Number(value);
      if (Number.isNaN(num))
        return Left(`${value} is not number parsable string`);
      if (!Number.isFinite(num)) return Left(`${value} is not finite number`);
      return Right(num);
    }),
  encode: (value) => `${value}`,
});

export const Integer = extendCodec<number>(number, (value) => {
  if (value !== Math.floor(value)) return Left(`${value} is not integer`);
  if (!Number.isFinite(value)) return Left(`${value} is not finite number`);
  return Right(value);
});

export const IntegerFromString = chainCodec(NumberFromString, Integer);

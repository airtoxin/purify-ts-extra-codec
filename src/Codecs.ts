import { extendCodec } from "./utils";
import { Left, number, Right, string } from "purify-ts/es";

export const NonEmptyString = extendCodec<string>(string, (value) => {
  if (value === "") return Left("value must not be empty");
  return Right(value);
});

export type RangeOption = {
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
};

export const StringLengthRangedIn = ({ gt, gte, lt, lte }: RangeOption) =>
  extendCodec<string>(string, (value) => {
    const length = value.length;
    if (gt != null && !(gt < length))
      return Left(`string length must be greater than ${gt}`);
    if (gte != null && !(gte <= length))
      return Left(`string length must be greater than equal ${gte}`);
    if (lt != null && !(lt > length))
      return Left(`string length must be less than ${lt}`);
    if (lte != null && !(lte >= length))
      return Left(`string length must be less than equal ${lte}`);
    return Right(value);
  });

export const NumberRangedIn = ({ gt, gte, lt, lte }: RangeOption) =>
  extendCodec<number>(number, (value) => {
    if (gt != null && !(gt < value))
      return Left(`number must be greater than ${gt}`);
    if (gte != null && !(gte <= value))
      return Left(`number must be greater than equal ${gte}`);
    if (lt != null && !(lt > value))
      return Left(`number must be less than ${lt}`);
    if (lte != null && !(lte >= value))
      return Left(`number must be less than equal ${lte}`);
    return Right(value);
  });

import { extendCodec } from "./utils";
import { Left, Right, string } from "purify-ts/es";

export const NonEmptyString = extendCodec<string>(string, (value) => {
  if (value === "") return Left("value must not be empty");
  return Right(value);
});

export type StringLengthRangeOption = {
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
};

export const StringLengthRangedIn = ({
  gt,
  gte,
  lt,
  lte,
}: StringLengthRangeOption) =>
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

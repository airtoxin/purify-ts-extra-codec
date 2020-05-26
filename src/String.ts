import { extendCodec } from "./utils";
import { Codec, Left, Right, string } from "purify-ts/es";
import formatDate from "date-fns/format";
import parseDate from "date-fns/parse";

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
      return Left(`length of ${value} must be greater than ${gt}`);
    if (gte != null && !(gte <= length))
      return Left(`length of ${value} must be greater than equal ${gte}`);
    if (lt != null && !(lt > length))
      return Left(`length of ${value} must be less than ${lt}`);
    if (lte != null && !(lte >= length))
      return Left(`length of ${value} must be less than equal ${lte}`);
    return Right(value);
  });

export const RegExpMatchedString = (regexp: RegExp) =>
  extendCodec<string>(string, (value) => {
    if (!regexp.test(value))
      return Left(`${value} is not matched to ${regexp}`);
    return Right(value);
  });

export const FormattedStringFromDate = (format: string) =>
  Codec.custom<string>({
    decode: (value) => {
      if (!(value instanceof Date)) {
        return Left(`${value} is not instance of Date`);
      }
      return Right(formatDate(value, format));
    },
    encode: (value) => parseDate(value, format, new Date()),
  });

import { extendCodec, withSchema } from "./utils";
import { Codec, Left, Right, string } from "purify-ts";
import formatDate from "date-fns/format";
import parseDate from "date-fns/parse";
import { isValid } from "date-fns";
import warning from "warning";

export const NonEmptyString = withSchema(
  extendCodec<string>(string, (value) => {
    if (value === "") return Left("value must not be empty");
    return Right(value);
  }),
  (stringSchema) => ({
    ...stringSchema,
    pattern: ".+",
  })
);

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
  withSchema(
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
    }),
    (stringSchema) => ({
      ...stringSchema,
      ...(gte ? { minLength: gte } : {}),
      ...(gt ? { minLength: gt + 1 } : {}),
      ...(lte ? { maxLength: lte } : {}),
      ...(lt ? { maxLength: lt - 1 } : {}),
    })
  );

export const RegExpMatchedString = (
  regexp: RegExp | string,
  flags?: string
) => {
  warning(
    typeof regexp === "string",
    "RegExp object argument of RegExpMatchedString Codec was deprecated, use string argument and flag instead."
  );
  return withSchema(
    extendCodec<string>(string, (value) => {
      const re = new RegExp(regexp, flags);
      if (!re.test(value)) return Left(`${value} is not matched to ${re}`);
      return Right(value);
    }),
    (stringSchema) => ({
      ...stringSchema,
      ...(typeof regexp === "string" ? { pattern: regexp } : {}),
    })
  );
};

export const FormattedStringFromDate = (format: string) =>
  Codec.custom<string>({
    decode: (value) => {
      if (!isValid(value)) {
        return Left(`${value} is not instance of Date`);
      }
      return Right(formatDate(value as Date, format));
    },
    encode: (value) => parseDate(value, format, new Date()),
  });

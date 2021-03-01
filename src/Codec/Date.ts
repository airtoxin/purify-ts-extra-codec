import { Codec, Left, Right, string } from "purify-ts";
import isValid from "date-fns/isValid";
import formatDate from "date-fns/format";
import parseDate from "date-fns/parse";

export const DateFromAny = Codec.custom<Date>({
  decode: (value) => {
    if (
      typeof value !== "string" &&
      typeof value !== "number" &&
      !(value instanceof Date)
    ) {
      return Left(`${value} cannot convert to Date`);
    }
    const date = new Date(value);
    if (!isValid(date)) return Left(`${value} cannot convert to valid Date`);
    return Right(date);
  },
  encode: (value) => value.toJSON(),
});

export const DateFromStringFormatOf = (format: string) =>
  Codec.custom<Date>({
    decode: (value) =>
      string.decode(value).chain((str) => {
        const date = parseDate(str, format, new Date());
        if (!isValid(date))
          return Left(`${value} is not suitable format of ${format}`);
        return Right(date);
      }),
    encode: (value) => formatDate(value, format),
  });

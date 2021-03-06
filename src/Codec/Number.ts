import { chainCodec, extendCodec, withSchema } from "./utils";
import { Codec, Left, number, Right, string } from "purify-ts";

export type NumberRangeOption = {
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
};

export const NumberRangedIn = ({ gt, gte, lt, lte }: NumberRangeOption) =>
  withSchema(
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
    }),
    (numberSchema) => ({
      ...numberSchema,
      ...(gte ? { minimum: gte } : {}),
      ...(gt ? { exclusiveMinimum: gt } : {}),
      ...(lte ? { maximum: lte } : {}),
      ...(lt ? { exclusiveMaximum: lt } : {}),
    })
  );

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
  schema: () => ({
    type: "string",
    pattern: "^-?\\d+(?:\\.\\d*)?(?:e\\d+)?$",
  }),
});

export const Integer = withSchema(
  extendCodec<number>(number, (value) => {
    if (value !== Math.floor(value)) return Left(`${value} is not integer`);
    if (!Number.isFinite(value)) return Left(`${value} is not finite number`);
    return Right(value);
  }),
  () => ({
    type: "integer",
  })
);

export const IntegerFromString = withSchema(
  chainCodec(NumberFromString, Integer),
  () => ({
    type: "string",
    pattern: "^-?\\d+(?:e\\d+)?$",
  })
);

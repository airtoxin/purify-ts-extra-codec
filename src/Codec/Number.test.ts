import { Left, Right } from "purify-ts";
import {
  Integer,
  IntegerFromString,
  NumberFromString,
  NumberRangedIn,
} from "./Number";
import Ajv from "ajv";

const ajv = new Ajv();
const left = Left(expect.any(String));

describe("NumberRangedIn", () => {
  describe("decode", () => {
    it("should return Right when value is greater than gt", () => {
      expect(NumberRangedIn({ gt: 3 }).decode(4)).toEqual(Right(4));
    });

    it("should return Left when value is not greater than gt", () => {
      expect(NumberRangedIn({ gt: 3 }).decode(3)).toEqual(left);
    });

    it("should return Right when value is greater than equal to gte", () => {
      expect(NumberRangedIn({ gte: 3 }).decode(3)).toEqual(Right(3));
    });

    it("should return Left when value is not greater than equal to gte", () => {
      expect(NumberRangedIn({ gte: 3 }).decode(2)).toEqual(left);
    });

    it("should return Right when value is less than lt", () => {
      expect(NumberRangedIn({ lt: 3 }).decode(2)).toEqual(Right(2));
    });

    it("should return Left when value is not less than lt", () => {
      expect(NumberRangedIn({ lt: 3 }).decode(3)).toEqual(left);
    });

    it("should return Right when value is less than equal to lte", () => {
      expect(NumberRangedIn({ lte: 3 }).decode(3)).toEqual(Right(3));
    });

    it("should return Left when value is not less than equal to lte", () => {
      expect(NumberRangedIn({ lte: 3 }).decode(4)).toEqual(left);
    });
  });

  describe("encode", () => {
    it("should return number", () => {
      expect(NumberRangedIn({ gt: 1 }).encode(10)).toBe(10);
    });
  });

  describe("schema", () => {
    it("gt test", () => {
      const schema = NumberRangedIn({ gt: 3 }).schema();
      const validate = ajv.compile(schema);
      expect(schema).toEqual({
        type: "number",
        exclusiveMinimum: 3,
      });
      expect(validate(4)).toBeTruthy();
      expect(validate(3.1)).toBeTruthy();
      expect(validate(3)).toBeFalsy();
    });

    it("gte test", () => {
      const schema = NumberRangedIn({ gte: 3 }).schema();
      const validate = ajv.compile(schema);
      expect(schema).toEqual({
        type: "number",
        minimum: 3,
      });
      expect(validate(4)).toBeTruthy();
      expect(validate(3)).toBeTruthy();
      expect(validate(2.9)).toBeFalsy();
    });

    it("lt test", () => {
      const schema = NumberRangedIn({ lt: 3 }).schema();
      const validate = ajv.compile(schema);
      expect(schema).toEqual({
        type: "number",
        exclusiveMaximum: 3,
      });
      expect(validate(2)).toBeTruthy();
      expect(validate(2.9)).toBeTruthy();
      expect(validate(3)).toBeFalsy();
    });

    it("lte convert to maximum", () => {
      const schema = NumberRangedIn({ lte: 3 }).schema();
      const validate = ajv.compile(schema);
      expect(schema).toEqual({
        type: "number",
        maximum: 3,
      });
      expect(validate(2)).toBeTruthy();
      expect(validate(3)).toBeTruthy();
      expect(validate(3.1)).toBeFalsy();
    });

    it("multiple", () => {
      const schema = NumberRangedIn({ gt: 3, lte: 10 }).schema();
      const validate = ajv.compile(schema);
      expect(NumberRangedIn({ gt: 3, lte: 10 }).schema()).toEqual({
        type: "number",
        maximum: 10,
        exclusiveMinimum: 3,
      });
      expect(validate(3)).toBeFalsy();
      expect(validate(3.1)).toBeTruthy();
      expect(validate(10)).toBeTruthy();
      expect(validate(10.1)).toBeFalsy();
    });
  });
});

describe("NumberFromString", () => {
  describe("decode", () => {
    it("should return Right when value is number parsable string", () => {
      expect(NumberFromString.decode("-12.34")).toEqual(Right(-12.34));
      expect(NumberFromString.decode("3.2e10")).toEqual(Right(3.2e10));
    });

    it("should return Left when value is basic string", () => {
      expect(NumberFromString.decode("asdf")).toEqual(left);
    });

    it("should return Left when value is string of Infinity", () => {
      expect(NumberFromString.decode("Infinity")).toEqual(left);
      expect(NumberFromString.decode("-Infinity")).toEqual(left);
    });

    it("should return Left when value is not string", () => {
      expect(NumberFromString.decode(1234)).toEqual(left);
    });
  });

  describe("encode", () => {
    it("should return string", () => {
      expect(NumberFromString.encode(12.34)).toBe("12.34");
    });
  });

  describe("schema", () => {
    it("test", () => {
      const schema = NumberFromString.schema();
      const validate = ajv.compile(schema);
      expect(schema).toEqual({
        type: "string",
        pattern: "^-?\\d+(?:\\.\\d*)?(?:e\\d+)?$",
      });
      expect(validate("-12.34")).toBeTruthy();
      expect(validate("3.2e10")).toBeTruthy();
      expect(validate("Infinity")).toBeFalsy();
      expect(validate("")).toBeFalsy();
      expect(validate(10)).toBeFalsy();
    });
  });
});

describe("Integer", () => {
  describe("decode", () => {
    it("should return Right when value is integer", () => {
      expect(Integer.decode(1234)).toEqual(Right(1234));
      expect(Integer.decode(-1234)).toEqual(Right(-1234));
      expect(Integer.decode(0.9999999999999999999999999)).toEqual(Right(1));
    });

    it("should return Left when value is not integer", () => {
      expect(Integer.decode(1.2)).toEqual(left);
    });

    it("should return Left when value is NaN", () => {
      expect(Integer.decode(NaN)).toEqual(left);
    });

    it("should return Left when value is Infinity", () => {
      expect(Integer.decode(Infinity)).toEqual(left);
    });
  });

  describe("encode", () => {
    it("should return number", () => {
      expect(Integer.encode(1234)).toBe(1234);
    });
  });

  describe("schema", () => {
    it("test", () => {
      const schema = Integer.schema();
      const validate = ajv.compile(schema);
      expect(schema).toEqual({
        type: "integer",
      });
      expect(validate(1234)).toBeTruthy();
      expect(validate(-1234)).toBeTruthy();
      expect(validate(0.9999999999999999999999999)).toBeTruthy();
      expect(validate(12.34)).toBeFalsy();
      expect(validate(-12.34)).toBeFalsy();
      expect(validate(NaN)).toBeFalsy();
      expect(validate(Infinity)).toBeFalsy();
    });
  });
});

describe("IntegerFromString", () => {
  describe("decode", () => {
    it("should return Right when value is integer parsable string", () => {
      expect(IntegerFromString.decode("-1234")).toEqual(Right(-1234));
    });

    it("should return Left when value is float parsable string", () => {
      expect(IntegerFromString.decode("12.34")).toEqual(left);
    });

    it("should return Left when value is basic string", () => {
      expect(IntegerFromString.decode("asdf")).toEqual(left);
    });

    it("should return Left when value is NaN string", () => {
      expect(IntegerFromString.decode("NaN")).toEqual(left);
    });

    it("should return Left when value is Infinity string", () => {
      expect(IntegerFromString.decode("Infinity")).toEqual(left);
    });
  });

  describe("encode", () => {
    it("should return string", () => {
      expect(IntegerFromString.encode(1234)).toBe("1234");
    });
  });

  describe("schema", () => {
    it("test", () => {
      const schema = IntegerFromString.schema();
      const validate = ajv.compile(schema);
      expect(schema).toEqual({
        type: "string",
        pattern: "^-?\\d+(?:e\\d+)?$",
      });
      expect(validate("1234")).toBeTruthy();
      expect(validate("-1234")).toBeTruthy();
      expect(validate("12.34")).toBeFalsy();
      expect(validate("-12.34")).toBeFalsy();
      expect(validate("NaN")).toBeFalsy();
      expect(validate("Infinity")).toBeFalsy();
    });
  });
});

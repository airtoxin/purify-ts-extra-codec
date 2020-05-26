import { Left, Right } from "purify-ts/es";
import {
  Integer,
  IntegerFromString,
  NumberFromString,
  NumberRangedIn,
} from "./Number";

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
});

describe("Integer", () => {
  describe("decode", () => {
    it("should return Right when value is integer", () => {
      expect(Integer.decode(1234)).toEqual(Right(1234));
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
});

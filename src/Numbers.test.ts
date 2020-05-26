import { Left, Right } from "purify-ts/es";
import { NumberRangedIn } from "./Numbers";

describe("NumberRangedIn", () => {
  describe("decode", () => {
    it("should return Right when value is greater than gt", () => {
      expect(NumberRangedIn({ gt: 3 }).decode(4)).toEqual(Right(4));
    });

    it("should return Left when value is not greater than gt", () => {
      expect(NumberRangedIn({ gt: 3 }).decode(3)).toEqual(
        Left(expect.any(String))
      );
    });

    it("should return Right when value is greater than equal to gte", () => {
      expect(NumberRangedIn({ gte: 3 }).decode(3)).toEqual(Right(3));
    });

    it("should return Left when value is not greater than equal to gte", () => {
      expect(NumberRangedIn({ gte: 3 }).decode(2)).toEqual(
        Left(expect.any(String))
      );
    });

    it("should return Right when value is less than lt", () => {
      expect(NumberRangedIn({ lt: 3 }).decode(2)).toEqual(Right(2));
    });

    it("should return Left when value is not less than lt", () => {
      expect(NumberRangedIn({ lt: 3 }).decode(3)).toEqual(
        Left(expect.any(String))
      );
    });

    it("should return Right when value is less than equal to lte", () => {
      expect(NumberRangedIn({ lte: 3 }).decode(3)).toEqual(Right(3));
    });

    it("should return Left when value is not less than equal to lte", () => {
      expect(NumberRangedIn({ lte: 3 }).decode(4)).toEqual(
        Left(expect.any(String))
      );
    });
  });

  describe("encode", () => {
    it("should return number", () => {
      expect(NumberRangedIn({ gt: 1 }).encode(10)).toBe(10);
    });
  });
});

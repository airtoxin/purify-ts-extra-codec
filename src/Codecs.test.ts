import "jest";
import { NonEmptyString, NumberRangedIn, StringLengthRangedIn } from "./Codecs";
import { Left, Right } from "purify-ts/es";

describe("NonEmptyString", () => {
  describe("decode", () => {
    it("should return Right when value is not empty", () => {
      expect(NonEmptyString.decode("asdf")).toEqual(Right("asdf"));
    });

    it("should return Left when value is empty", () => {
      expect(NonEmptyString.decode("")).toEqual(Left(expect.any(String)));
    });
  });

  describe("encode", () => {
    it("should return string", () => {
      expect(NonEmptyString.encode("asdf")).toBe("asdf");
    });
  });
});

describe("StringLengthRangedIn", () => {
  describe("decode", () => {
    it("should return Right when value length have greater than gt", () => {
      expect(StringLengthRangedIn({ gt: 3 }).decode("asdf")).toEqual(
        Right("asdf")
      );
    });

    it("should return Left when value length have not greater than gt", () => {
      expect(StringLengthRangedIn({ gt: 4 }).decode("asdf")).toEqual(
        Left(expect.any(String))
      );
    });

    it("should return Right when value length have greater than equal to gte", () => {
      expect(StringLengthRangedIn({ gte: 4 }).decode("asdf")).toEqual(
        Right("asdf")
      );
    });

    it("should return Left when value length have not greater than equal to gte", () => {
      expect(StringLengthRangedIn({ gte: 5 }).decode("asdf")).toEqual(
        Left(expect.any(String))
      );
    });

    it("should return Right when value length have less than lt", () => {
      expect(StringLengthRangedIn({ lt: 5 }).decode("asdf")).toEqual(
        Right("asdf")
      );
    });

    it("should return Left when value length have not less than lt", () => {
      expect(StringLengthRangedIn({ lt: 4 }).decode("asdf")).toEqual(
        Left(expect.any(String))
      );
    });

    it("should return Right when value length have less than equal to lte", () => {
      expect(StringLengthRangedIn({ lte: 4 }).decode("asdf")).toEqual(
        Right("asdf")
      );
    });

    it("should return Left when value length have not less than equal to lte", () => {
      expect(StringLengthRangedIn({ lte: 3 }).decode("asdf")).toEqual(
        Left(expect.any(String))
      );
    });

    it("complex pattern gt-lt", () => {
      const codec = StringLengthRangedIn({ gt: 2, lt: 4 });

      expect(codec.decode("as")).toEqual(Left(expect.any(String)));
      expect(codec.decode("asd")).toEqual(Right("asd"));
      expect(codec.decode("asdf")).toEqual(Left(expect.any(String)));
    });

    it("complex pattern gte-lte", () => {
      const codec = StringLengthRangedIn({ gte: 3, lte: 3 });

      expect(codec.decode("as")).toEqual(Left(expect.any(String)));
      expect(codec.decode("asd")).toEqual(Right("asd"));
      expect(codec.decode("asdf")).toEqual(Left(expect.any(String)));
    });
  });

  describe("encode", () => {
    it("should return string", () => {
      expect(StringLengthRangedIn({ lt: 1 }).encode("asdf")).toBe("asdf");
    });
  });
});

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

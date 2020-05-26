import "jest";
import {
  NonEmptyString,
  RegExpMatchedString,
  StringLengthRangedIn,
} from "./Strings";
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

describe("RegExpMatchedString", () => {
  describe("decode", () => {
    it("should return Right when value is matched to regexp", () => {
      expect(RegExpMatchedString(/^\d{4}\s\w{2}$/).decode("1234 ab")).toEqual(
        Right("1234 ab")
      );
    });

    it("should return Left when value is not matched to regexp", () => {
      expect(RegExpMatchedString(/^\w+$/).decode("ab1cd")).toEqual(
        Left(expect.any(String))
      );
    });
  });

  describe("encode", () => {
    it("should return string", () => {
      expect(RegExpMatchedString(/^\w$/).encode("a")).toBe("a");
    });
  });
});

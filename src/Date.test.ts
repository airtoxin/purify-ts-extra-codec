import "jest";
import { DateFromAny, DateFromStringFormatOf } from "./Date";
import { Left, Right } from "purify-ts";

const left = Left(expect.any(String));

describe("DateFromAny", () => {
  describe("decode", () => {
    it("should return Right when value is parsable date number", () => {
      const date = new Date();
      expect(DateFromAny.decode(date.getTime())).toEqual(Right(date));
    });

    it("should return Right when value is parsable date string", () => {
      const date = new Date();
      expect(DateFromAny.decode(date.toISOString())).toEqual(Right(date));
      expect(DateFromAny.decode(date.toJSON())).toEqual(Right(date));
      expect(DateFromAny.decode("2020")).toEqual(Right(new Date("2020")));
    });

    it("should return Right when value is date", () => {
      const date = new Date();
      expect(DateFromAny.decode(date)).toEqual(Right(date));
    });

    it("should return Left when value is invalid number", () => {
      expect(DateFromAny.decode(Infinity)).toEqual(left);
      expect(DateFromAny.decode(NaN)).toEqual(left);
    });

    it("should return Left when value is invalid string", () => {
      expect(DateFromAny.decode("asdf")).toEqual(left);
      expect(DateFromAny.decode("tomorrow")).toEqual(left);
      expect(DateFromAny.decode("2020年01月01日")).toEqual(left);
    });

    it("should return Left when value is invalid date", () => {
      expect(DateFromAny.decode(new Date("a"))).toEqual(left);
    });
  });

  describe("encode", () => {
    it("should return string", () => {
      const date = new Date();
      expect(DateFromAny.encode(date)).toBe(date.toJSON());
    });
  });
});

describe("DateFromStringFormatOf", () => {
  describe("decode", () => {
    it("should return Right when value has same format of format argument", () => {
      expect(DateFromStringFormatOf("yyyy_MM_dd").decode("2020_01_01")).toEqual(
        Right(new Date("2020/01/01"))
      );
    });

    it("should return Left when value is invalid date", () => {
      expect(DateFromStringFormatOf("yyyy_MM_dd").decode("2020_51_91")).toEqual(
        left
      );
    });

    it("should return Left when value not have same format of format argument", () => {
      expect(
        DateFromStringFormatOf("yyyy_MM_dd").decode("2020_______01_01")
      ).toEqual(left);
    });
  });

  describe("encode", () => {
    it("should return formatted date string", () => {
      const date = new Date("2020-01-01T00:00:00.000Z");
      expect(DateFromStringFormatOf("yyyy_MM_dd").encode(date)).toBe(
        "2020_01_01"
      );
    });
  });
});

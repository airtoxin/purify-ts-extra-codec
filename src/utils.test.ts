import { extendCodec } from "./utils";
import { number, Left, Right } from "purify-ts";

const left = Left(expect.any(String));

describe("extendCodec", () => {
  describe("extend codec with decoder(s)", () => {
    it("should apply chained decoder", () => {
      const extended = extendCodec(number, (value) => Right(value + 1));
      expect(extended.decode(5)).toEqual(Right(6));
    });

    it("should fail with chained decoder", () => {
      const extended = extendCodec(number, (_) => Left("nope"));
      expect(extended.decode("foo")).toEqual(left);
    });

    it("should apply multiple chained decoders", () => {
      const extended = extendCodec(
        number,
        (value) => Right(value + 5),
        (value) => Right(value * 10),
        (value) => Right(value * value)
      );
      expect(extended.decode(5)).toEqual(Right(10000));
    });

    it("should fail with multiple chained decoders", () => {
      const extended = extendCodec(
        number,
        (value) => Right(value + 5),
        (_) => Left("nah"),
        (value) => Right(value * value)
      );
      expect(extended.decode(5)).toEqual(left);
    });
  });
});

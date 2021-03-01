import { sequenceWeak } from "./sequenceWeak";
import { Left, Right } from "purify-ts";

describe("sequenceWeak", () => {
  it("should return Right tuple when all of inputs are Right", () => {
    expect(
      sequenceWeak(
        Right(1),
        Right("foo"),
        Right(false),
        Right(null),
        Right({ bar: "baz" }),
        Right([1, 3, 7, 13])
      )
    ).toEqual(Right([1, "foo", false, null, { bar: "baz" }, [1, 3, 7, 13]]));
  });

  it("should return Left when some input is Left", () => {
    expect(
      sequenceWeak(
        Right(1),
        Left("foo"),
        Right(false),
        Right(null),
        Right({ bar: "baz" }),
        Right([1, 3, 7, 13])
      )
    ).toEqual(Left("foo"));
  });
});

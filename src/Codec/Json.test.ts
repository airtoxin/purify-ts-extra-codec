import { JsonFromString } from "./Json";
import { array, Left, number, Right, string, unknown } from "purify-ts";
import { Codec } from "purify-ts/Codec";

const left = Left(expect.any(String));

describe("JsonFromString", () => {
  describe("decode", () => {
    it("should decode string", () => {
      expect(JsonFromString(string).decode(`"asdf"`)).toEqual(Right("asdf"));
    });

    it("should return error when json mismatched to string", () => {
      expect(JsonFromString(string).decode(`1234`)).toEqual(left);
    });

    it("should decode number", () => {
      expect(JsonFromString(number).decode(`1234`)).toEqual(Right(1234));
    });

    it("should return error when json mismatched to number", () => {
      expect(JsonFromString(number).decode(`"1234"`)).toEqual(left);
    });

    it("should decode array", () => {
      expect(JsonFromString(array(unknown)).decode(`[1, 2, "3", "4"]`)).toEqual(
        Right([1, 2, "3", "4"])
      );
    });

    it("should return error when json mismatched to array", () => {
      expect(JsonFromString(array(unknown)).decode(`{}`)).toEqual(left);
    });

    it("should decode object", () => {
      expect(
        JsonFromString(Codec.interface({ type: string })).decode(
          `{ "type": "hello" }`
        )
      ).toEqual(Right({ type: "hello" }));
    });

    it("should return error when json mismatched to object", () => {
      expect(JsonFromString(Codec.interface({})).decode(`[]`)).toEqual(left);
    });
  });
});

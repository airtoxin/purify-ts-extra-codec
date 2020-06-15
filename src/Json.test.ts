import { JsonParsable } from "./Json";
import { array, Left, number, Right, string, unknown } from "purify-ts";
import { Codec } from "purify-ts/Codec";

const left = Left(expect.any(String));

describe("JsonParsable", () => {
  describe("decode", () => {
    it("should decode string", () => {
      expect(JsonParsable(string).decode(`"asdf"`)).toEqual(Right("asdf"));
    });

    it("should return error when json mismatched to string", () => {
      expect(JsonParsable(string).decode(`1234`)).toEqual(left);
    });

    it("should decode number", () => {
      expect(JsonParsable(number).decode(`1234`)).toEqual(Right(1234));
    });

    it("should return error when json mismatched to number", () => {
      expect(JsonParsable(number).decode(`"1234"`)).toEqual(left);
    });

    it("should decode array", () => {
      expect(JsonParsable(array(unknown)).decode(`[1, 2, "3", "4"]`)).toEqual(
        Right([1, 2, "3", "4"])
      );
    });

    it("should return error when json mismatched to array", () => {
      expect(JsonParsable(array(unknown)).decode(`{}`)).toEqual(left);
    });

    it("should decode object", () => {
      expect(
        JsonParsable(Codec.interface({ type: string })).decode(
          `{ "type": "hello" }`
        )
      ).toEqual(Right({ type: "hello" }));
    });

    it("should return error when json mismatched to object", () => {
      expect(JsonParsable(Codec.interface({})).decode(`[]`)).toEqual(left);
    });
  });
});

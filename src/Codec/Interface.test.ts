import { Interface } from "./Interface";
import { Codec, GetType, optional, Right, string } from "purify-ts";

describe("Interface", () => {
  const def = { str: string, ops: optional(string) };
  const c = Interface(def);

  it("should return interface Codec", () => {
    expect(c.decode({ str: "foo" })).toEqual(Right({ str: "foo" }));
    // compile test
    const v: GetType<typeof c> = { str: "foo" };
    expect(v).toEqual({ str: "foo" });
  });

  it("should return the type accepting object that its optional field to be not defined", () => {
    // compile test: 'ops' field not defined but acceptable
    // `GetType<typeof c>` equals to `{ str: string, ops?: string | undefined }`
    const v: GetType<typeof c> = { str: "foo" };
    expect(v).toEqual({ str: "foo" });
  });

  it("should return same schema to original interface Codec", () => {
    expect(c.schema()).toEqual(Codec.interface(def).schema());
  });
});

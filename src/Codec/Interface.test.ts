import { Interface } from "./Interface";
import { GetType, optional, Right, string } from "purify-ts";

describe("Interface", () => {
  const c = Interface({ str: string, ops: optional(string) });

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
});

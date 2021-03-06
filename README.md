# purify-ts-extra-codec

🛠 Extra utility codecs for [purify-ts](https://gigobyte.github.io/purify/).

## Install

```
npm install --save purify-ts-extra-codec
# or
yarn add purify-ts-extra-codec
```

## API

### interface codec alternative

### Interface

Alternative implementation of `Codec.interface`.  
Original `Codec.interface` returns optional field type to `T | undefined`, so it should give undefined explicitly if declare value with type annotation.

```typescript
const value: GetType<typeof MyCodec> = { optionalField: undefined }
```  

`Interface` allows to you to implicit undefined field value.  
Implementation of `Interface` is internally uses original `Codec.interface`, it only changes returning type.

```typescript
const ObjCodec = Interface({ str: string, opt: optional(string) });
ObjCodec.decode({ str: "foo" }) // Right({ str: "foo" });
const obj: GetInterface<typeof ObjCodec> = { str: "foo" };
```

❤️ Support `schema`.

### String Codec Module

#### NonEmptyString

Ensure input string is non-empty.

```typescript
NonEmptyString.decode("asdf"); // Right("asdf")
NonEmptyString.decode(""); // Left("[error message]")
NonEmptyString.decode(1234); // Left("[error message]")
```

❤️ Support `schema`.

#### StringLengthRangedIn

Ensure length of input string is in range.

```typescript
StringLengthRangedIn({ gt: 2, lte: 5 }).decode("asdf"); // Right("asdf")
StringLengthRangedIn({ gte: 5, lte: 5 }).decode("asdf"); // Left("[error message]")
StringLengthRangedIn({ gte: 5, lte: 5 }).decode(1234); // Left("[error message]")
```

❤️ Support `schema`.

#### RegExpMatchedString

Ensure input string matched to RegExp.

```typescript
RegExpMatchedString("\\w+").decode("asdf"); // Right("asdf")
RegExpMatchedString("\\w+").decode("1234"); // Left("[error message]")
RegExpMatchedString("\\w+").decode(1234); // Left("[error message]")

// those are deprecated interface (Non schema support)
RegExpMatchedString(/\w+/).decode("asdf"); // Right("asdf")
RegExpMatchedString(/\w+/).decode("1234"); // Left("[error message]")
RegExpMatchedString(/\w+/).decode(1234); // Left("[error message]")
```

❤️ Support `schema`.

#### FormattedStringFromDate

Convert Date instance into formatted string.

```typescript
FormattedStringFromDate("yyyy_MM_dd").decode(new Date()); // Right("2020_01_01")
FormattedStringFromDate("yyyy_MM_dd").decode(new Date("InvalidDate")); // Left("[error message]")
FormattedStringFromDate("yyyy_MM_dd").decode("asdf"); // Left("[error message]")
```

⚠️ No `schema` support.

### Number Codec Module

#### NumberRangedIn

Ensure input number is in range.

```typescript
NumberRangedIn({ gt: 2, lte: 5 }).decode(3); // Right(3)
NumberRangedIn({ gte: 2, lt: 5 }).decode(0); // Left("[error message]")
NumberRangedIn({ gt: 2, lte: 5 }).decode("a"); // Left("[error message]")
```

❤️ Support `schema`.

#### NumberFromString

Convert string into number (if parsable).

```typescript
NumberFromString.decode("-12.34"); // Right(-12.34)
NumberFromString.decode("Infinity"); // Left("[error message]")
NumberFromString.decode(1234); // Left("[error message]")
```

❤️ Support `schema`.

#### Integer

Ensure input number is integer.

```typescript
Integer.decode(1234); // Right(1234)
Integer.decode(12.34); // Left("[error message]")
Integer.decode("1234"); // Left("[error message]")
```

❤️ Support `schema`.

#### IntegerFromString

Convert string into integer number (if possible).

```typescript
IntegerFromString.decode("1234"); // Right(1234)
IntegerFromString.decode("12.34"); // Left("[error message]")
IntegerFromString.decode(1234); // Left("[error message]")
```

❤️ Support `schema`.

### Date Codec Module

#### DateFromAny

Convert any date parsable object into Date.

```typescript
DateFromAny.decode("2020/01/01"); // Right(Wed Jan 01 2020 00:00:00)
DateFromAny.decode(1577804400000); // Right(Wed Jan 01 2020 00:00:00)
DateFromAny.decode("today"); // Left("[error message]")
```

⚠️ No `schema` support.

#### DateFromStringFormatOf

Convert formatted date string into Date.

```typescript
DateFromStringFormatOf("yyyy_MM_dd").decode("2020_01_01"); // Right(Wed Jan 01 2020 00:00:00)
DateFromStringFormatOf("yyyy_MM_dd").decode("2020"); // Left("[error message]")
DateFromStringFormatOf("yyyy_MM_dd").decode(new Date()); // Left("[error message]")
```

⚠️ No `schema` support.

### Json Codec Module

#### JsonFromString

Convert string into Json value.

```typescript
JsonFromString(Codec.interface({ type: string })).decode(`{ "type": "hello" }`); // Right({ type: "hello" })
JsonFromString(Codec.interface({ type: string })).decode(`{}`); // Left("[error message]")
JsonFromString(Codec.interface({ type: string })).decode(1234); // Left("[error message]")
```

⚠️ No `schema` support.

### Codec Utility Module

#### withSchema

Utility for adding a schema after defined.

```typescript
withSchema(
  MyCodec,
  (myCodecSchema) => ({
    ...myCodecSchema,
    pattern: "^[a-fA-F\\d]{8}$"
  })
);
```

#### extendCodec

Utility for type narrowing.

```typescript
const ThreeLengthString = extendCodec(stringCodec, (str) =>
  str.length === 3 ? Right(str) : Left(`${str} must have exact 3 length`)
);

ThreeLengthString.decode("123"); // Right("123");
ThreeLengthString.decode("1"); // Left("[error message]")
ThreeLengthString.decode(1); // Left("[error message]")
```

#### chainCodec

Utility for composing multiple Codecs.
This function accepts up to 9 Codecs.

```typescript
const ThreeDigitIntegerFromString = chainCodec(
  ThreeLengthString,
  NumberFromString,
  Integer
);

ThreeDigitNumberFromString.decode("123"); // Right(123)
ThreeDigitNumberFromString.decode("1.4"); // Left("[error message]")
ThreeDigitNumberFromString.decode(123); // Left("[error message]")
```

#### sequenceWeak

`sequenceWeak` accepts up to 9 Either values and combines to one Either tuple.  
All of Either `Left` type must be same, but `Right` types may not be same.  
It is useful to wrap up multiple Codec results.  
Name comes from weak Right type constraint of `Either.sequence`.

```typescript
import { sequenceWeak } from "./sequenceWeak";

EitherAsync(async ({liftEither}) => {
  const [str, { id }, int] = await liftEither(sequenceWeak(
    string.decode(var1),
    Codec.interface({ id: string }).decode(var2),
    Integer.decode(var3)
  ));
})
```

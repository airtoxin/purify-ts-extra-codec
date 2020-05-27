# purify-ts-extra-codec

Extra utility codecs for [purify-ts](https://gigobyte.github.io/purify/).

## Install

```
npm install --save purify-ts-extra-codec
# or
yarn add purify-ts-extra-codec
```

## API

### String Codec Module

#### NonEmptyString

Ensure input string is non-empty.

```typescript
NonEmptyString.decode("asdf"); // Right("asdf")
NonEmptyString.decode(""); // Left("[error message]")
NonEmptyString.decode(1234); // Left("[error message]")
```

#### StringLengthRangedIn

Ensure length of input string is in range.

```typescript
StringLengthRangedIn({ gt: 2, lte: 5 }).decode("asdf"); // Right("asdf")
StringLengthRangedIn({ gte: 5, lte: 5 }).decode("asdf"); // Left("[error message]")
StringLengthRangedIn({ gte: 5, lte: 5 }).decode(1234); // Left("[error message]")
```

#### RegExpMatchedString

Ensure input string matched to RegExp.

```typescript
RegExpMatchedString(/\w+/).decode("asdf"); // Right("asdf")
RegExpMatchedString(/\w+/).decode("1234"); // Left("[error message]")
RegExpMatchedString(/\w+/).decode(1234); // Left("[error message]")
```

#### FormattedStringFromDate

Convert Date instance into formatted string.

```typescript
FormattedStringFromDate("yyyy_MM_dd").decode(new Date()); // Right("2020_01_01")
FormattedStringFromDate("yyyy_MM_dd").decode(new Date("InvalidDate")); // Left("[error message]")
FormattedStringFromDate("yyyy_MM_dd").decode("asdf"); // Left("[error message]")
```

### Number Codec Module

#### NumberRangedIn

Ensure input number is in range.

```typescript
NumberRangedIn({ gt: 2, lte: 5 }).decode(3); // Right(3)
NumberRangedIn({ gte: 2, lt: 5 }).decode(0); // Left("[error message]")
NumberRangedIn({ gt: 2, lte: 5 }).decode("a"); // Left("[error message]")
```

#### NumberFromString

Convert string into number (if parsable).

```typescript
NumberFromString.decode("-12.34"); // Right(-12.34)
NumberFromString.decode("Infinity"); // Left("[error message]")
NumberFromString.decode(1234); // Left("[error message]")
```

#### Integer

Ensure input number is integer.

```typescript
Integer.decode(1234); // Right(1234)
Integer.decode(12.34); // Left("[error message]")
Integer.decode("1234"); // Left("[error message]")
```

#### IntegerFromString

Convert string into integer number (if possible).

```typescript
IntegerFromString.decode("1234"); // Right(1234)
IntegerFromString.decode("12.34"); // Left("[error message]")
IntegerFromString.decode(1234); // Left("[error message]")
```

### Date Codec Module

#### DateFromAny

Convert any date parsable object into Date.

```typescript
DateFromAny.decode("2020/01/01"); // Right(Wed Jan 01 2020 00:00:00)
DateFromAny.decode(1577804400000); // Right(Wed Jan 01 2020 00:00:00)
DateFromAny.decode("today"); // Left("[error message]")
```

#### DateFromStringFormatOf

Convert formatted date string into Date.

```typescript
DateFromStringFormatOf("yyyy_MM_dd").decode("2020_01_01"); // Right(Wed Jan 01 2020 00:00:00)
DateFromStringFormatOf("yyyy_MM_dd").decode("2020"); // Left("[error message]")
DateFromStringFormatOf("yyyy_MM_dd").decode(new Date()); // Left("[error message]")
```

### Codec Utility Module

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

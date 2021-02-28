import { Either, Left, Right } from "purify-ts";

export function sequenceWeak<L, R1>(e1: Either<L, R1>): Either<L, [R1]>;
export function sequenceWeak<L, R1, R2>(
  e1: Either<L, R1>,
  e2: Either<L, R2>
): Either<L, [R1, R2]>;
export function sequenceWeak<L, R1, R2, R3>(
  e1: Either<L, R1>,
  e2: Either<L, R2>,
  e3: Either<L, R3>
): Either<L, [R1, R2, R3]>;
export function sequenceWeak<L, R1, R2, R3, R4>(
  e1: Either<L, R1>,
  e2: Either<L, R2>,
  e3: Either<L, R3>,
  e4: Either<L, R4>
): Either<L, [R1, R2, R3, R4]>;
export function sequenceWeak<L, R1, R2, R3, R4, R5>(
  e1: Either<L, R1>,
  e2: Either<L, R2>,
  e3: Either<L, R3>,
  e4: Either<L, R4>,
  e5: Either<L, R5>
): Either<L, [R1, R2, R3, R4, R5]>;
export function sequenceWeak<L, R1, R2, R3, R4, R5, R6>(
  e1: Either<L, R1>,
  e2: Either<L, R2>,
  e3: Either<L, R3>,
  e4: Either<L, R4>,
  e5: Either<L, R5>,
  e6: Either<L, R6>
): Either<L, [R1, R2, R3, R4, R5, R6]>;
export function sequenceWeak<L, R1, R2, R3, R4, R5, R6, R7>(
  e1: Either<L, R1>,
  e2: Either<L, R2>,
  e3: Either<L, R3>,
  e4: Either<L, R4>,
  e5: Either<L, R5>,
  e6: Either<L, R6>,
  e7: Either<L, R7>
): Either<L, [R1, R2, R3, R4, R5, R6, R7]>;
export function sequenceWeak<L, R1, R2, R3, R4, R5, R6, R7, R8>(
  e1: Either<L, R1>,
  e2: Either<L, R2>,
  e3: Either<L, R3>,
  e4: Either<L, R4>,
  e5: Either<L, R5>,
  e6: Either<L, R6>,
  e7: Either<L, R7>,
  e8: Either<L, R8>
): Either<L, [R1, R2, R3, R4, R5, R6, R7, R8]>;
export function sequenceWeak<L, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  e1: Either<L, R1>,
  e2: Either<L, R2>,
  e3: Either<L, R3>,
  e4: Either<L, R4>,
  e5: Either<L, R5>,
  e6: Either<L, R6>,
  e7: Either<L, R7>,
  e8: Either<L, R8>,
  e9: Either<L, R9>
): Either<L, [R1, R2, R3, R4, R5, R6, R7, R8, R9]>;
export function sequenceWeak<L, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  e1: Either<L, R1>,
  e2?: Either<L, R2>,
  e3?: Either<L, R3>,
  e4?: Either<L, R4>,
  e5?: Either<L, R5>,
  e6?: Either<L, R6>,
  e7?: Either<L, R7>,
  e8?: Either<L, R8>,
  e9?: Either<L, R9>
):
  | Either<L, [R1]>
  | Either<L, [R1, R2]>
  | Either<L, [R1, R2, R3]>
  | Either<L, [R1, R2, R3, R4]>
  | Either<L, [R1, R2, R3, R4, R5]>
  | Either<L, [R1, R2, R3, R4, R5, R6]>
  | Either<L, [R1, R2, R3, R4, R5, R6, R7]>
  | Either<L, [R1, R2, R3, R4, R5, R6, R7, R8]>
  | Either<L, [R1, R2, R3, R4, R5, R6, R7, R8, R9]> {
  const results = [];

  if (e9) {
    if (e9.isRight()) {
      results.push(e9.unsafeCoerce());
    } else if (e9.isLeft()) {
      return Left<L, [R1, R2, R3, R4, R5, R6, R7, R8, R9]>(e9.extract());
    }
  }

  if (e8) {
    if (e8.isRight()) {
      results.push(e8.unsafeCoerce());
    } else if (e8.isLeft()) {
      return Left<L, [R1, R2, R3, R4, R5, R6, R7, R8]>(e8.extract());
    }
  }

  if (e7) {
    if (e7.isRight()) {
      results.push(e7.unsafeCoerce());
    } else if (e7.isLeft()) {
      return Left<L, [R1, R2, R3, R4, R5, R6, R7]>(e7.extract());
    }
  }

  if (e6) {
    if (e6.isRight()) {
      results.push(e6.unsafeCoerce());
    } else if (e6.isLeft()) {
      return Left<L, [R1, R2, R3, R4, R5, R6]>(e6.extract());
    }
  }

  if (e5) {
    if (e5.isRight()) {
      results.push(e5.unsafeCoerce());
    } else if (e5.isLeft()) {
      return Left<L, [R1, R2, R3, R4, R5]>(e5.extract());
    }
  }

  if (e4) {
    if (e4.isRight()) {
      results.push(e4.unsafeCoerce());
    } else if (e4.isLeft()) {
      return Left<L, [R1, R2, R3, R4]>(e4.extract());
    }
  }

  if (e3) {
    if (e3.isRight()) {
      results.push(e3.unsafeCoerce());
    } else if (e3.isLeft()) {
      return Left<L, [R1, R2, R3]>(e3.extract());
    }
  }

  if (e2) {
    if (e2.isRight()) {
      results.push(e2.unsafeCoerce());
    } else if (e2.isLeft()) {
      return Left<L, [R1, R2]>(e2.extract());
    }
  }

  if (e1.isRight()) {
    results.push(e1.unsafeCoerce());
  } else if (e1.isLeft()) {
    return Left<L, [R1, R2]>(e1.extract());
  }

  results.reverse();

  switch (results.length) {
    case 1:
      return Right<[R1]>(results as [R1]);
    case 2:
      return Right<[R1, R2]>(results as [R1, R2]);
    case 3:
      return Right<[R1, R2, R3]>(results as [R1, R2, R3]);
    case 4:
      return Right<[R1, R2, R3, R4]>(results as [R1, R2, R3, R4]);
    case 5:
      return Right<[R1, R2, R3, R4, R5]>(results as [R1, R2, R3, R4, R5]);
    case 6:
      return Right<[R1, R2, R3, R4, R5, R6]>(
        results as [R1, R2, R3, R4, R5, R6]
      );
    case 7:
      return Right<[R1, R2, R3, R4, R5, R6, R7]>(
        results as [R1, R2, R3, R4, R5, R6, R7]
      );
    case 8:
      return Right<[R1, R2, R3, R4, R5, R6, R7, R8]>(
        results as [R1, R2, R3, R4, R5, R6, R7, R8]
      );
    case 9:
      return Right<[R1, R2, R3, R4, R5, R6, R7, R8, R9]>(
        results as [R1, R2, R3, R4, R5, R6, R7, R8, R9]
      );
    default:
      throw new Error(`Unexpected length of result`);
  }
}

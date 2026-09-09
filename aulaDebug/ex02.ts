interface DivisionInput {
    numerator: number;
    denominator: number;
}

import { AppError } from "./error.ts";


function divide(input: DivisionInput): number {
    return input.numerator / input.denominator;
}

function execute(rawInput: DivisionInput): void {

    try {

        if (rawInput.numerator === undefined || rawInput.denominator === undefined) {
            throw new AppError(`Os valores não podem ser indefinidos.`, 400);
        }

        if (typeof rawInput.numerator !== "number" || typeof rawInput.denominator !== "number") {
            throw new AppError(`Os valores não podem ser string.`, 400);
        }

        if (isNaN(rawInput.numerator) || isNaN(rawInput.denominator)) {
            throw new AppError(`Os valores devem ser números válidos.`, 400);
        }

        if (rawInput.denominator === 0) {
            throw new AppError(`O denominador não pode ser zero.`, 400);
        }

        console.log(divide(rawInput));

    } catch (error) {
        if (error instanceof AppError) {
            console.error(`Erro ${error.statusCode}: ${error.message}`);
        }
    }
}

execute({
  numerator: 10,
  denominator: 0
});

execute({
  numerator: NaN,
  denominator: 2
});

execute({
  numerator: 10,
  denominator: NaN
});

execute({
  numerator: undefined as unknown as number,
  denominator: 10
});

execute({
  numerator: "10" as unknown as number,
  denominator: 10
});

execute({
  numerator: 10,
  denominator: 2
});
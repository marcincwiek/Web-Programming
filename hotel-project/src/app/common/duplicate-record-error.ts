import { AppError } from "./app-error";

export class DuplicateRecordError extends AppError {
    constructor(message: string) {
        super(message);
        this.name = 'DuplicateRecordError';
    }
}
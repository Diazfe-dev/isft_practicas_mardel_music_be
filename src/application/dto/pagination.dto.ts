export class PaginationDto {
    page: number;
    limit: number;

    constructor(data: Partial<PaginationDto>) {
        Object.assign(this, data);

        this.page = Number(data.page) ?? 1;
        this.limit = Number(data.limit) ?? 10;
    }

    validate(): string[] {
        const errors: string[] = [];

        if (this.page && typeof this.page !== 'number') errors.push("Page must be a number.");

        if (this.page && this.page < 0) errors.push("Page must be greater than 0");

        if (this.limit && typeof this.limit !== 'number') errors.push("Limit must be a number.");

        if (this.limit && this.limit < 0) errors.push("Page must be greater than 0");

        return errors;
    }
}


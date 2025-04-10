import UserSchema from "../../models/user.schema.interface";

export class UpdateUserDto {
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
    profilePicture?: string;

    constructor(data: Partial<UserSchema>) {
        Object.assign(this, data);
    }

    validate(): string[] {
        const errors: string[] = [];

        if (this.name && this.name.length < 3) errors.push("Name must be at least 3 characters");
        if (this.name && this.name.length > 50) errors.push("Name must be at most 50 characters");

        if (this.lastName && this.lastName.length < 3) errors.push("Last name must be at least 3 characters");
        if (this.lastName && this.lastName.length > 50) errors.push("Last name must be at most 50 characters");

        if (this.profilePicture && !this.profilePicture.startsWith('http')) errors.push("Profile picture must be a valid url");
        return errors;
    }
}

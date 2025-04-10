import UserSchema from "../../models/user.schema.interface";

export class CreateUserDto {
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
    profilePicture?: string;

    constructor(data: Partial<UserSchema>) {
        Object.assign(this, data);
        this.profilePicture = data.profilePicture ?? '';
    }

    validate(): string[] {
        const errors: string[] = [];

        if (!this.name) errors.push("Name is required");
        if (this.name && this.name.length < 3) errors.push("Name must be at least 3 characters");
        if (this.name && this.name.length > 50) errors.push("Name must be at most 50 characters");

        if (!this.lastName) errors.push("Last name is required");
        if (this.lastName && this.lastName.length < 3) errors.push("Last name must be at least 3 characters");
        if (this.lastName && this.lastName.length > 50) errors.push("Last name must be at most 50 characters");

        if (!this.email) errors.push("Email is required");
        if (this.email && !this.email.includes('@')) errors.push("Valid email is required");
        if (this.email && this.email.length < 3) errors.push("Email must be at least 3 characters");
        if (this.email && this.email.length > 50) errors.push("Email must be at most 50 characters");

        if (!this.password) errors.push("Password is required");
        if (this.password && this.password.length < 6) errors.push("Password must be at least 6 characters");
        if (this.password && this.password.length > 50) errors.push("Password must be at most 50 characters");
        if (this.password && this.password.includes(' ')) errors.push("Password must not contain spaces");

        if (this.profilePicture && !this.profilePicture.startsWith('http')) errors.push("Profile picture must be a valid url");
        return errors;
    }
}
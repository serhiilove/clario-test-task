import { FieldError, UseFormRegister } from "react-hook-form";

export type SignupFormData = {
    email: string;
    password: string;
};

export type FormFieldProps = {
    className?: string;
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<SignupFormData>;
    error?: FieldError | undefined;
    errorMessage?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ValidFieldNames = 'email' | 'password';
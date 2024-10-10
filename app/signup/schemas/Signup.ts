import { z, ZodType } from 'zod';
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from '../lib/constants';
import { SignupFormData } from '../types';

export const SignupSchema: ZodType<SignupFormData> = z.object({
    email: z
        .string()
        .email({ 
            message: 'Invalid email address'
        }),
    password: z
        .string()
        .min(PASSWORD_MIN_LENGTH, { 
            message: `${PASSWORD_MIN_LENGTH} characters or more`
        })
        .max(PASSWORD_MAX_LENGTH, { 
            message: `${PASSWORD_MAX_LENGTH} characters maximum`
        })
        .refine((val) => /[A-Z]/.test(val) && /[a-z]/.test(val), 'Uppercase and lowercase latters')
        .refine((val) => {
            let hasDigits = false;

            for (let i = 0; i < val.length; i++) {
                if (!isNaN(+val.charAt(i))) {
                    hasDigits = true;
                    break;
                }
            }

            return hasDigits;
        }, 'At least one digit')
});
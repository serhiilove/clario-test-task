'use client';

import debounce from "lodash/debounce";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from './components/FormField';
import { SignupSchema } from './schemas/Signup';
import { SignupFormData, ValidFieldNames } from './types';
import { signUp } from './actions';


export default function SignupForm () {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        trigger,
    } = useForm<SignupFormData>({
        resolver: zodResolver(SignupSchema)
    });

    function getDebouncedChangeFunction(fieldName: ValidFieldNames, timeout: number) {
        return debounce(async (newValue) => {
            setValue(fieldName, newValue);
            trigger(fieldName);
        }, timeout);
    }
    
    const debouncedEmailInput = getDebouncedChangeFunction('email', 600);

    return (
        <form
            className='flex flex-col items-center'
            onSubmit={handleSubmit(signUp)}
        >
            <FormField 
                className="mb-[16px]"
                type='email'
                placeholder='Email'
                name='email'
                register={register}
                error={errors.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    debouncedEmailInput(e.target.value);
                }}
            />

            <FormField 
                type='password'
                placeholder='Password'
                name='password'
                register={register}
                error={errors.password}
                errorMessage={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue('password', e.target.value);
                    trigger('password');
                }}
            />
            
            <button 
                className="w-[240px] h-[48px] rounded-3xl m-[32px]
                    bg-gradient-to-l from-indigo-500 to-indigo-300
                    font-bold text-white"
                type="submit"
                disabled={isSubmitting}
            >
                Sign up
            </button>
        </form>
    )
}
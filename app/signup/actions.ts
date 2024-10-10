'use server';

import { SignupFormData } from "./types";

export async function signUp(data: SignupFormData) {
    console.log(`Signing up with ${data}`);
}
'use client'

import {useEffect, useState} from "react";
import {toast} from "sonner";
import {passwordRequirements} from "@/app/(auth)/inscriere/data";

export default function useSignin() {
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    function areAllFilled(...values: Array<string | undefined>): boolean {
        return values.every(value => value !== undefined && value.trim() !== '')
    }

    const isFormFilled = areAllFilled(lastName, firstName, email, password, confirmPassword);

    function validator(): boolean {
        if (!isFormFilled) return false;

        if (password.length < 7) {
            toast.error('Parola ta trebuie să conțină cel puțin 8 caractere.')
            return false
        }

        if (strengthScore < 3) {
            toast.error('Parola e prea slabă.')
            return false
        }

        if (password !== confirmPassword) {
            toast.error('Parolele nu coincid.')
            return false
        }

        return true
    }

    const strength = passwordRequirements.map(req => ({
        met: req.regex.test(password),
        text: req.text
    }));

    const strengthScore = passwordRequirements.filter(req => req.regex.test(password)).length;


    useEffect(() => {
        console.log("Signup state updated:", {
            lastName,
            firstName,
            password,
            confirmPassword,
        })
    }, [lastName, firstName, email, password, confirmPassword])

    return {
        states:{
            lastName: {
                value: lastName,
                set: setLastName,
            },
            firstName: {
                value: firstName,
                set: setFirstName,
            },
            email: {
                value: email,
                set: setEmail,
            },
            password: {
                value: password,
                set: setPassword,
            },
            confirmPassword: {
                value: confirmPassword,
                set: setConfirmPassword,
            },
        },
        validator: validator,
        controls: {
            isFormFilled: isFormFilled
        },
        strength: {
            strength: strength,
            strengthScore: strengthScore
        }
    }
}
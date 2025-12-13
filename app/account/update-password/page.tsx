'use client'

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet
} from "@/components/ui/field";
import PasswordInput from "@/components/PasswordInput";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {toast} from "sonner";
import {updatePasswordAction} from "@/lib/supabase/actions/resetPassword";
import {redirect} from "next/navigation";
import Link from "next/link";

export default function UpdatePassword() {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return toast.error('Parolele nu coincid!')
        }

        const result = await updatePasswordAction(newPassword);

        if (result?.error) {
             return  toast.error(result.error)
        } else {
            toast.success('Parola resetată cu succes!')
        }
        redirect('/auth/sign-in')
    }

    return (
        <div className={'w-full h-screen flex justify-center items-center bg-green-50 flex-col'}>
            <h1 className={'font-bold text-2xl text-green-900 mb-5'}>
                <Link href={'/'}>
                    CIVICOM✨
                </Link>
            </h1>
            <form className={' border border-gray-200 p-5 rounded-xl shadow bg-white'} onSubmit={handleSubmit}>
                <FieldSet>
                    <FieldLegend>
                        Resetează Parola
                    </FieldLegend>
                    <FieldDescription>
                        Introdu noua parolă in campurile de mai jos pentru a finaliza procesul.
                    </FieldDescription>
                    <FieldSeparator/>
                    <FieldGroup>
                        <Field>
                         <FieldLabel htmlFor={'new-password'}>
                             Noua Parolă
                         </FieldLabel>
                            <PasswordInput name={'new-password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={'confirm-password'}>
                                Confirmă Parolă
                            </FieldLabel>
                            <PasswordInput name={'confirm-password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </Field>
                    </FieldGroup>
                    <FieldSeparator/>
                    <Field orientation="responsive">
                        <Button type="submit">Salvează</Button>
                    </Field>
                </FieldSet>
            </form>
        </div>
    );
}
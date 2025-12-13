"use client"

import React, {JSX, useState} from "react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Eye, EyeOff } from "lucide-react"

/**
 * Props for PasswordInput component
 */
interface PasswordInputProps {
    /** Name attribute for the input field */
    name?: string
    /** Placeholder text for the input */
    placeholder?: string
    /** Controlled value for the input */
    value?: string
    /** Change handler for controlled input */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * PasswordInput component provides a password field with a toggle to show/hide the password.
 *
 * @param {PasswordInputProps} props - Props to configure the input field
 * @returns JSX.Element - Rendered password input with visibility toggle
 */
export default function PasswordInput({
                                          name = "password",
                                          placeholder = "Enter your password",
                                          value,
                                          onChange,
                                      }: PasswordInputProps): JSX.Element {
    // State to control visibility of the password
    const [visible, setVisible] = useState(false)

    return (
        <InputGroup>
            {/* Password input field, switches type between "text" and "password" */}
            <InputGroupInput
                type={visible ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                {...(value !== undefined ? { value, onChange } : {})}
            />

            {/* Toggle button to show/hide password */}
            <InputGroupAddon
                className="cursor-pointer"
                onClick={() => setVisible(!visible)}
                align="inline-end"
            >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </InputGroupAddon>
        </InputGroup>
    )
}

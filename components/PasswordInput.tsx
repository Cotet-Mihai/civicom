"use client"

import { useState } from "react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps {
    name?: string
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PasswordInput({
                                          name = "password",
                                          placeholder = "Enter your password",
                                          value,
                                          onChange,
                                      }: PasswordInputProps) {
    const [visible, setVisible] = useState(false)

    return (
        <InputGroup>
            <InputGroupInput
                type={visible ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                {...(value !== undefined ? { value, onChange } : {})}
            />

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

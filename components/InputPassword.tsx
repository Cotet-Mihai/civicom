"use client"

import React, {JSX, useState} from "react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Eye, EyeOff } from "lucide-react"


type InputPasswordProps = {
    name?: string
    placeholder?: string
    value: string
    onChangeAction: (value: string) => void
    tabIndex?: number
}


export default function InputPassword({
                                          name = "password",
                                          placeholder = "Introduceți parola",
                                          value,
                                          onChangeAction,
                                          tabIndex = 0,
                                      }: InputPasswordProps): JSX.Element {
    // State to control visibility of the password
    const [visible, setVisible] = useState(false)

    return (
        <InputGroup>
            {/* Password input field, switches type between "text" and "password" */}
            <InputGroupInput
                type={visible ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                value={value ?? ''}
                onChange={(e) => onChangeAction(e.target.value)}
                tabIndex={tabIndex}
            />

            {/* Toggle button to show/hide password */}
            <InputGroupAddon
                className="cursor-pointer"
                onClick={() => setVisible(!visible)}
                align="inline-end"
                tabIndex={-1}
            >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </InputGroupAddon>
        </InputGroup>
    )
}
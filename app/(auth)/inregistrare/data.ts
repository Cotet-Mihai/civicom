/**
 * Password validation requirements.
 *
 * Each rule contains:
 * - regex → validation pattern
 * - text → human-readable description (used in UI tooltip)
 *
 * Used for dynamic password strength calculation.
 */
export const passwordRequirements = [
    {
        regex: /.{12,}/,
        text: 'Cel puțin 12 caractere'
    },
    {
        regex: /[a-z]/,
        text: 'Cel puțin o literă mică'
    },
    {
        regex: /[A-Z]/,
        text: 'Cel puțin o literă mare'
    },
    {
        regex: /[0-9]/,
        text: 'Cel puțin un număr'
    },
    {
        // Escaped special characters for safe regex usage
        regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/,
        text: 'Cel puțin un caracter special'
    }
];
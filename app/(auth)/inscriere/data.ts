export const passwordRequirements = [
    { regex: /.{12,}/, text: 'Cel puțin 12 caractere' },
    { regex: /[a-z]/, text: 'Cel puțin o literă mică' },
    { regex: /[A-Z]/, text: 'Cel puțin o literă mare' },
    { regex: /[0-9]/, text: 'Cel puțin un număr' },
    { regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/, text: 'Cel puțin un caracter special' }
];
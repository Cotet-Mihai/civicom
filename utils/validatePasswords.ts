/**
 * Validates that the password and confirmation match.
 *
 * @param newPassword - The new password
 * @param confirmPassword - The confirmed password
 * @returns {string | null} Error message if invalid, null if valid
 */
export function validatePasswords(newPassword: string, confirmPassword: string): string | null {
    if (newPassword !== confirmPassword) return 'Parolele nu coincid!';
    if (newPassword.length < 8) return 'Parola trebuie să aibă minim 8 caractere!';
    return null;
}

export const isValidEmail = (email: string): boolean => {
    if(!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
    if(!password) return true;
    return password.length >= 6;
}

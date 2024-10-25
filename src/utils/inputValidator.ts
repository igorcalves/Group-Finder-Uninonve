export const isValidEmail = (email: string): boolean => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
    if (!password) return true;
    return password.length >= 6;
};

export const maskToQuantityNumber = (
    event: React.ChangeEvent<HTMLInputElement>
): void => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, '');
    const limitedValue = numericValue
        ? Math.min(parseInt(numericValue, 10), 12).toString()
        : '';
    event.target.value = limitedValue;
};

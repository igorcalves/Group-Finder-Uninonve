export const isValidEmail = (email: string): boolean => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
    if (!phone) return true;
    return phone.length === 15;
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

export const maskToPhoneNumber = (inputValue: string): string => {
    if (inputValue.length > 2) {
        inputValue = inputValue.replace(
            /^(\d{2})(\d{5})(\d{0,4}).*/,
            '($1) $2-$3'
        );
    }
    return inputValue;
};

export const onlyText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, '');
};

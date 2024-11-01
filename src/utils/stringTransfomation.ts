export const getFirstLetterOfNameAndSurname = (name: string): string => {
    if (name) {
        const nameSplited = name.split(' ');
        const firstNameLetter = nameSplited[0][0];
        const secondNameLetter = nameSplited[1] ? nameSplited[1][0] : '';
        return firstNameLetter.toUpperCase() + secondNameLetter.toUpperCase();
    }
    return '';
};

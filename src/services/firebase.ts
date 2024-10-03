import appConfig from '../config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from 'firebase/auth';
const auth = getAuth(appConfig);

export const register = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential.user;
    } catch (error) {
        return error;
    }
};

export const resetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log('Password reset email sent');
        return true;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return error;
    }
};

export const login = async (
    email: string,
    password: string,
    setCurrentPage: () => void
) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log('User logged in:', userCredential.user);
        if (userCredential.user) {
            setCurrentPage();
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return error;
    }
};

import appConfig from '../config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { Register } from '../domain/register';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const auth = getAuth(appConfig);

const db = getFirestore(appConfig);

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

const sanitizeEmail = (email: string) => {
    return email.replace(/[.#$[\]]/g, '_');
};

export const createAccount = async (
    registerObject: Register,
    setCurrentState: (state: string) => void
) => {
    const user: any = await register(
        registerObject.email,
        registerObject.password
    );
    if (user) {
        try {
            await setDoc(doc(db, 'users', user.uid), {
                name: registerObject.name,
                email: registerObject.email,
                phone: registerObject.phone,
                keyword: registerObject.keyword,
            });
            console.log('User document created in Firestore');
        } catch (error) {
            console.error('Error creating user document:', error);
        }
    }
};

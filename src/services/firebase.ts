import appConfig from '../config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { Register } from '../domain/register';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

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

export const resetPassword = async (
    email: string,
    setCurrentState: (state: string) => void
) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log('Password reset email sent');
        setCurrentState('login-enter');
        return true;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return error;
    }
};

export const login = async (
    email: string,
    password: string,
    setCurrentPage: () => void,
    setLoading: (loading: boolean) => void
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
            localStorage.setItem('loggedIn', 'true');
            setLoading(false);
        }
    } catch (error) {
        toast.error('Email ou senha inválidos');
        setLoading(false);
        return error;
    }
};

const sanitizeEmail = (email: string) => {
    return email.replace(/[.#$[\]]/g, '_');
};

export const createAccount = async (
    registerObject: Register,
    setCurrentState: (state: string) => void,
    setLoading: (loading: boolean) => void
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
            setCurrentState('login-enter');
            toast.success('Conta criada com sucesso');
            setLoading(false);
        } catch (error: any) {
            toast.error('O email já está em uso');
            setLoading(false);
        }
    }
};

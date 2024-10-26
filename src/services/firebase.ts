import appConfig from '../config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { Register } from '../domain/register';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    where,
    query,
    getDocs,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Group } from '../domain/group';
import { User } from '../domain/user';

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
        if (userCredential.user) {
            setCurrentPage();
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('user', userCredential.user.uid);
            setLoading(false);
        }
    } catch (error) {
        toast.error('Email ou senha inválidos');
        setLoading(false);
        return error;
    }
};

export const logout = async (setCurrentPage: () => void) => {
    try {
        await auth.signOut();
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('user');
        setCurrentPage();
    } catch (error) {
        return error;
    }
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
            return error;
        }
    }
};

export const getUser = async (): Promise<User | undefined> => {
    try {
        const user = localStorage.getItem('user');
        if (user) {
            const docRef = doc(db, 'users', user);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data() as User;
            } else {
                console.log('No such document!');
                return undefined;
            }
        } else {
            console.log('No user in localStorage');
            return undefined;
        }
    } catch (error) {
        console.error('Error getting user:', error);
        return undefined;
    }
};

export const createAGroup = async (group: Group): Promise<boolean> => {
    try {
        const canCreate = await canCreateANewGroup();

        if (!canCreate) {
            toast.error('Você já possui um grupo');
            return false;
        }
        await setDoc(doc(db, 'groups', group.id), {
            id: group.id,
            name: group.name,
            description: group.description,
            members: group.members,
            owner: group.owner,
            discipline: group.discipline,
            date: group.date,
            maxMembers: group.maxMembers,
            closedGroup: group.closedGroup,
        });
        return true;
    } catch (error) {
        console.log('Error adding document: ', error);
        return false;
    }
};

export const canCreateANewGroup = async (): Promise<boolean> => {
    try {
        const id = localStorage.getItem('user');
        const groupsRef = collection(db, 'groups');
        const q = query(groupsRef, where('id', '==', id));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking group existence:', error);
        return false;
    }
};

export const getGroups = async (): Promise<Group[]> => {
    const groups: Group[] = [];

    const querySnapshot = await getDocs(collection(db, 'groups'));
    querySnapshot.forEach((doc) => {
        groups.push(doc.data() as Group);
    });

    return groups;
};

export const getGroup = async (id: string): Promise<Group | undefined> => {
    try {
        const docRef = doc(db, 'groups', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as Group;
        } else {
            console.log('No such document!');
            return undefined;
        }
    } catch (error) {
        console.error('Error getting group:', error);
        return undefined;
    }
};

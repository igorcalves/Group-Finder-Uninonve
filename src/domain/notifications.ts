import { User } from './user';

export interface GroupNotification {
    id: string;
    title: string;
    description: string;
    date: string;
    read: boolean;
    type: string;
    user?: User;
}

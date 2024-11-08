import { GroupNotification } from './notifications';
import { User } from './user';

export interface Group {
    name: string;
    description: string;
    members?: User[];
    date: string;
    discipline: string;
    tags: string[];
    owner: User | undefined;
    id: string;
    maxMembers: number;
    closedGroup: boolean;
    groupNotifications?: GroupNotification[];
}

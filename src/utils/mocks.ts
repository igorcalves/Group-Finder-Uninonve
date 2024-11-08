import { GroupNotification } from '../domain/notifications';

export const notifications: GroupNotification[] = [
    {
        id: '1',
        title: 'Notificação 1',
        description: 'Descrição da notificação 1',
        date: new Date().toISOString(),
        read: false,
        type: 'info',
        user: {
            id: '1',
            name: 'Usuário 1',
            email: 'teste1@mail.com',
            phone: '123456789',
        },
    },
    {
        id: '2',
        title: 'Notificação 2',
        description: 'Descrição da notificação 2',
        date: new Date().toISOString(),
        read: false,
        type: 'info',
        user: {
            id: '2',
            name: 'Usuário 2',
            email: 'teste2@mail.com',
            phone: '123456789',
        },
    },
    {
        id: '3',
        title: 'Notificação 3',
        description: 'Descrição da notificação 3',
        date: new Date().toISOString(),
        read: false,
        type: 'info',
        user: {
            id: '3',
            name: 'Usuário 3',
            email: 'teste3@mail.com',
            phone: '323456789',
        },
    },

    {
        id: '4',
        title: 'Notificação 4',
        description: 'Descrição da notificação 4',
        date: new Date().toISOString(),
        read: false,
        type: 'info',
    },
    {
        id: '5',
        title: 'Notificação 5',
        description: 'Descrição da notificação 5',
        date: new Date().toISOString(),
        read: false,
        type: 'info',
    },

    {
        id: '6',
        title: 'Notificação 6',
        description: 'Descrição da notificação 6',
        date: new Date().toISOString(),
        read: false,
        type: 'info',
    },

    {
        id: '7',
        title: 'Notificação 7',
        description: 'Descrição da notificação 7',
        date: new Date().toISOString(),
        read: false,
        type: 'info',
    },

    {
        id: '8',
        title: 'Notificação 8',
        description: 'Descrição da notificação 8',
        date: new Date().toISOString(),
        read: false,
        type: 'info',
    },

    {
        id: '9',
        title: 'Notificação 9',
        description: 'Descrição da notificação 9',
        date: new Date().toISOString(),
        read: false,
        type: 'info',
    },
];

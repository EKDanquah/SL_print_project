import {
    NotificationOutlined
} from '@ant-design/icons';

// icons
const icons = {
    NotificationOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
    id: 'configuration',
    title: 'Admin Configuration',
    type: 'group',
    children: [
        {
            id: 'alerts',
            title: 'Notification',
            type: 'item',
            url: '/pushNotification',
            icon: icons.NotificationOutlined
        },

    ]
};


export default utilities;

// assets
import { LoginOutlined, UserOutlined, GroupOutlined, SortAscendingOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    UserOutlined,
    GroupOutlined,
    SortAscendingOutlined
};


const pages = {
    id: 'agent',
    title: 'Users & Print Jobs',
    type: 'group',
    children: [
        {
            id: 'print-jobs',
            title: 'Print Jobs',
            type: 'item',
            url: '/print-jobs',
            icon: icons.SortAscendingOutlined,
            target: true
        },
        {
            id: 'pending-admin',
            title: 'Pending admin',
            type: 'item',
            url: '/pending-admin',
            icon: icons.UserOutlined,
            target: true
        },
        {
            id: 'agent',
            title: 'Agents',
            type: 'item',
            url: '/agents',
            icon: icons.UserOutlined,
            target: true
        },
        {
            id: 'consumer',
            title: 'Consumers',
            type: 'item',
            url: '/consumers',
            icon: icons.GroupOutlined,
            target: true
        }
    ]
};


export default pages;

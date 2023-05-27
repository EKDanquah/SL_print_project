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
    id: 'prints',
    title: 'Print Request',
    type: 'group',
    children: [
        {
            id: 'print jobs',
            title: 'Print Jobs',
            type: 'item',
            url: '/print-jobs',
            icon: icons.SortAscendingOutlined,
            target: true
        },
        {
            id: 'institutions',
            title: 'User And Group',
            type: 'item',
            
            url: '/institutions',
            icon: icons.UserOutlined,
            target: true
        },
    ]
};


export default pages;

// assets
import { SettingOutlined } from '@ant-design/icons';

// icons
const icons = {
    SettingOutlined
};


const support = {
    id: 'settings',
    title: 'Settings',
    type: 'group',
    children: [
        {
            id: 'app_settings',
            title: 'App Settings',
            type: 'item',
            url: '/setting',
            icon: icons.SettingOutlined
        },

    ]
};

export default support;


// pages needed 

/**
 * /sample-page
 * /login
 * /register
 * /pushNotification
/color
/shadow
/tables'
/icons/ant
 */
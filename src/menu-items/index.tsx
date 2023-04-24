// project import
import dashboard from './dashboard';
import pages from './pages';
import support from './support';
import utilities from './utilities';

// ==============================|| MENU ITEMS ||============================== //

export type NavigationType = { items: NavigationItemType[] }

const menuItems: NavigationType = {
    items: [dashboard, pages, utilities, support]
};

export type NavigationItemType = typeof dashboard | typeof pages | typeof utilities | typeof support;


export default menuItems;



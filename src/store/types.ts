// action - account reducer
export const LOGIN = '@auth/LOGIN';
export const LOGOUT = '@auth/LOGOUT';
export const REGISTER = '@auth/REGISTER';

export type ContextType = {
    activeItem: (openItem: string[]) => void
    activeComponent: (openComponent: string) => void
    openDrawer: (drawerOpen: boolean) => void,
    openComponentDrawer: (componentDrawerOpen: boolean) => void,

} & {
    openItem: string[];
    openComponent: string;
    drawerOpen: boolean;
    componentDrawerOpen: boolean;
}


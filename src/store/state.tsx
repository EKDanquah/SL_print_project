import React, { ReactElement, useMemo } from "react";
import { AppbarContext } from "./context";

export function AppBarContextProvider(props: { children: ReactElement | ReactElement[] }) {
    const initialState = {
        openItem: ['dashboard'],
        openComponent: 'buttons',
        drawerOpen: false,
        componentDrawerOpen: true
    };

    const [state, setState] = React.useState(initialState);

    function activeItem(openItem: string[]) {
        setState(prev => ({ ...prev, openItem }))
    }
    function activeComponent(openComponent: string) {
        setState(prev => ({ ...prev, openComponent }))
    }
    function openDrawer(drawerOpen: boolean) {
        setState(prev => ({ ...prev, drawerOpen }))
    }
    function openComponentDrawer(componentDrawerOpen: boolean) {

        setState(prev => ({ ...prev, componentDrawerOpen }))
    }
    return (
        <AppbarContext.Provider
            value={useMemo(() => ({
                ...state,
                activeComponent,
                activeItem,
                openDrawer,
                openComponentDrawer,
            }), [state])} >
            {props.children}
        </AppbarContext.Provider>
    )

}
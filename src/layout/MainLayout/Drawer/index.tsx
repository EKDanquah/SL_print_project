import { useMemo } from 'react';

// material-ui
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import { drawerWidth } from '../../../config';
import DrawerContent from './DrawerContent';
import DrawerHeader from './DrawerHeader';
import MiniDrawerStyled from './MiniDrawerStyled';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

const MainDrawer = ({ open, handleDrawerToggle, window }: MainDrawerPropTypes) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    // responsive drawer container
    const container = window?.().document.body;

    // header content
    const drawerContent = useMemo(() => <DrawerContent />, []);
    const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">
            {!matchDownMD ? (
                <MiniDrawerStyled variant="permanent" open={open}>
                    {drawerHeader}
                    {drawerContent}
                </MiniDrawerStyled>
            )
                : (
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={open}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { xs: 'block', lg: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                                borderRight: `1px solid ${theme.palette.divider}`,
                                backgroundImage: 'none',
                                boxShadow: 'inherit'
                            }
                        }}
                    >
                        {open && drawerHeader}
                        {open && drawerContent}
                    </Drawer>
                )}
        </Box>
    );
};

type MainDrawerPropTypes = {
    open: boolean,
    handleDrawerToggle: () => void,
    window?: () => Window & typeof globalThis
};

// function an(){
// window.
// }
export default MainDrawer;
// material-ui
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { drawerWidth } from '../../../config';

// project import

const openedMixin = (theme: Theme) => ({
    width: drawerWidth,
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),

    boxShadow: 'none'
});

const closedMixin = (theme: Theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),

    width: 0,
    borderRight: 'none',
    // @ts-ignore
    boxShadow: theme.customShadows?.z1
});

// ==============================|| DRAWER - MINI STYLED ||============================== //

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })
    <{ open?: boolean }>
    (({ theme, open }) => ({
        // width: drawerWidth,
        overflowX: 'hidden',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open ?
            {
                ...(openedMixin(theme)),
                '& .MuiDrawer-paper': openedMixin(theme)
            }
            :
            {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme)
            }
        ),
    }));

export default MiniDrawerStyled;

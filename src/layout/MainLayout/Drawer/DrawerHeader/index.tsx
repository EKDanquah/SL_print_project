
// material-ui
import { Chip, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import Logo from '../../../../components/Logo/Logo';
import DrawerHeaderStyled from './DrawerHeaderStyled';

const process = import.meta;
// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }: DrawerHeaderPropTypes) => {
    const theme = useTheme();
    console.log(process)
    return (
        // only available in paid version
        <DrawerHeaderStyled theme={theme} open={open}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Logo />
                <Chip
                    label={"EGPD"}
                    // label={process.env.REACT_APP_VERSION}
                    size="small"
                    sx={{ height: 16, '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }}
                    component="a"
                    href="/"
                    target="_blank"
                    clickable
                />
            </Stack>
        </DrawerHeaderStyled>
    );
};

type DrawerHeaderPropTypes = {
    open: boolean
};

export default DrawerHeader;

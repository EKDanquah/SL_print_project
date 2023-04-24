import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, SxProps } from '@mui/material';

// project import
import { Theme } from '@mui/material';
import Logo from './Logo';
import config from '../../config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }: LogoSectionPropTypes) => (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
        <Logo />
    </ButtonBase>
);

type LogoSectionPropTypes = {
    sx?: SxProps<Theme>,
    to?: string
};

export default LogoSection;

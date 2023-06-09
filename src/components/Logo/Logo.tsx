// material-ui
import { Avatar, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import avatar from '../../assets/images/logo.png';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Mantis" width="100" />
         *
         */
        <>
            <Avatar
                alt="Logo"
                src={avatar}
                sx={{ width: 56, height: 56 }}
            />
        </>
    );
};

export default Logo;

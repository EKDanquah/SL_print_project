// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box } from '@mui/material';
import avatar from '../logo.png';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
    const theme = useTheme();
    return (



        <Box sx={{ position: 'absolute', filter: 'blur(13px)', zIndex: -1, bottom: 0, left: 30 }}>
            <img
                alt="Logo"
                src={avatar}
                style={{

                    height: "calc(100vh - 175px)"
                }}
            />

        </Box>
    );
};

export default AuthBackground;

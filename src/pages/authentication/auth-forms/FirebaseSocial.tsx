// material-ui
import { Button, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// assets
import Google from '../../../assets/images/icons/google.svg';

type FirebaseSocialType = {
    googleHandler?: () => void
}

const FirebaseSocial = ({ googleHandler }: FirebaseSocialType) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));



    return (
        <Stack
            direction="row"
            spacing={matchDownSM ? 1 : 2}
            justifyContent={matchDownSM ? 'space-around' : 'space-between'}
            sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
        >
            <Button

                variant="outlined"
                color="secondary"
                fullWidth={!matchDownSM}
                startIcon={<img src={Google} alt="Google" />}
                onClick={() => googleHandler?.()}
            >
                {!matchDownSM && 'Google'}
            </Button>

        </Stack>
    );
};

export default FirebaseSocial;

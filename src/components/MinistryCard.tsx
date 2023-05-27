import { Box, ButtonBase, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InstitutionType } from '../schema/schema';
import { Link } from 'react-router-dom';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
});

export default function MinistryGrid({ ministry }: { ministry: InstitutionType }) {
    return (
        <Box
        
        sx={{
            textDecoration:"none"
        }}
        component={Link} to={`/institutions/ministry?id=${ministry.objectId}`}>
            <Paper
                sx={{
                    cursor: 'pointer',
                    p: 2,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff')
                }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase sx={{ width: 128, height: 128 }}>
                            <Img alt="complex" src={ministry.photoUrl} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {ministry.name + ' '}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {ministry.email + ' '}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ID: {ministry.objectId + ' '}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

import { Box, Button, ButtonBase, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InstitutionDepartmentType } from '../schema/schema';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { InstitutionUsersClass } from '../controllers/users';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
});

export default function DepartmentGrid({ department, ministryId }: { department: InstitutionDepartmentType; ministryId?: string }) {
    let insUsers = new InstitutionUsersClass();
//     const [searchParams] = useSearchParams();

//     const departmentId = searchParams.get('id');
//     // const insId = searchParams.get('insId');
// // alert(departmentId)
    const { data } = useQuery([`getAllUsersByDepartmentId(${department.objectId})`], () => insUsers.getAllUsersByDepartmentId(department.objectId as string), {
        staleTime: 1000 * 10 // keep cache for minute
    });

    return (
        <Link style={{ textDecoration: 'none' }} to={`/institutions/ministry/departments?id=${department.objectId}&insId=${ministryId}`}>
            <Paper
                sx={{
                    cursor: 'pointer',
                    p: 2,
                    margin: 'auto',
                    maxWidth: { xs: 500, md: 300 },
                    flexGrow: 1,
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff')
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {department.title + ' '}
                                </Typography>

                                <Typography variant="body2" color="primary">
                                    {data?.length??"0"} admin
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Click for more
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Link>
    );
}

// material-ui
import { Avatar, AvatarGroup, Grid, List, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Pagination, Stack, Typography } from '@mui/material';


import MainCard from '../../components/MainCard';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined, WarningOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Search from '../../layout/MainLayout/Header/HeaderContent/Search';
import Button from '../../themes/overrides/Button';

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const NotificationPage = () => { 

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>


            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Search />
                    </Grid>
                    <Grid item />
                </Grid>

                <Grid item xs={12} md={12} lg={12}>

                    <MainCard sx={{ mt: 2 }} content={false}>
                        <List
                            component="nav"
                            sx={{
                                px: 0,
                                py: 0,
                                '& .MuiListItemButton-root': {
                                    py: 1.5,
                                    '& .MuiAvatar-root': avatarSX,
                                    '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                                }
                            }}
                        >

                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,].map(() => {
                                    return (
                                        <ListItemButton divider>
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        color: 'error.main',
                                                        bgcolor: 'error.lighter'
                                                    }}
                                                >
                                                    <WarningOutlined />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={<Typography variant="subtitle1">Activation Issue</Typography>}
                                                secondary="Joseph Cooper" />
                                            <ListItemSecondaryAction>
                                                <Stack alignItems="flex-end">

                                                    <Typography variant="h6" color="secondary" noWrap>
                                                        {"Today, 2:00 AM"}
                                                    </Typography>
                                                </Stack>
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                    )
                                })
                            }
                        </List>
                    </MainCard>
                    <MainCard sx={{ mt: 2 }}>
                        <Stack spacing={3}> 
                            <Stack alignItems='flex-end'>
                                <Pagination count={10} variant="outlined" />
                            </Stack> 
                        </Stack>
                    </MainCard>

                </Grid>
            </Grid>
        </Grid>
    );
};

export default NotificationPage;
 
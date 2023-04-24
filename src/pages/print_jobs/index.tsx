// // material-ui
// import { Grid, Typography } from '@mui/material';


// import MainCard from '../../components/MainCard';

// // assets
// import { useState } from 'react';
// import AdvanceTable from '../../components/Tables';

// // avatar style
// const avatarSX = {
//     width: 36,
//     height: 36,
//     fontSize: '1rem'
// };

// // action style
// const actionSX = {
//     mt: 0.75,
//     ml: 1,
//     top: 'auto',
//     right: 'auto',
//     alignSelf: 'flex-start',
//     transform: 'none'
// };

// // sales report status
// const status = [
//     {
//         value: 'today',
//         label: 'Today'
//     },
//     {
//         value: 'month',
//         label: 'This Month'
//     },
//     {
//         value: 'year',
//         label: 'This Year'
//     }
// ];

// // ==============================|| DASHBOARD - DEFAULT ||============================== //

// const PrintJobsPage = () => {
//     const [value, setValue] = useState('today');
//     const [slot, setSlot] = useState('week');

//     return (
//         <Grid container rowSpacing={4.5} columnSpacing={2.75}>


//             <Grid item xs={12} md={12} lg={12}>


//                 <MainCard sx={{ mt: 2 }} content={false}>
//                     {/* <AdvanceTable

//                     /> */}
//                 </MainCard>
//             </Grid>
//         </Grid>
//     );
// };

// export default PrintJobsPage;


import { useEffect, useState } from 'react';

// material-ui
import {
    Button,
    Grid
} from '@mui/material';

// project import

// assets
import AnalyticEcommerce from '../../components/cards/statistics/AnalyticEcommerce';
import MainCard from '../../components/MainCard';
import AlertDialogSlide from '../../components/modal/formDialog';
import AdvanceTable from '../../components/Tables';
import AddUserFormLogin from '../../layout/Forms/UsersForm';
import TableSearch from '../agent/searchInput';
import { useQuery } from '@tanstack/react-query';
import { getAgents } from '../../api';
import PrintJobsFormLogin from '../../layout/Forms/Raffel';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

const PrintJobsPage = () => {
    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');

    const { data, error, isLoading, } = useQuery(['getAgents'], getAgents, {
        staleTime: 1000 * 10// keep cache for minute
    });
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total token" count="433,236" percentage={59.3} extra=" " />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Token issued out" count="78,250" percentage={70.5} extra=" " />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Played" count="18,800" percentage={27.4} isLoss color="warning" extra=" " />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Wins" count="35,078" percentage={27.4} isLoss color="warning" extra=" " />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />


            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <TableSearch />
                        <DialogButton />
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <AdvanceTable
                        DATALIST={data ?? []}
                        DataType="AgentType"
                    />
                </MainCard>
            </Grid>



        </Grid>
    );
};



function DialogButton(

) {
    const [open, setOpen] = useState<boolean>(false);

    function handleClickOpen() {
        setOpen(true);

    };

    function handleClose() {

        setOpen(false);
    };
    useEffect(() => {

    }, [open])

    return (<AlertDialogSlide
        handleClose={(e) => { e.preventDefault(); handleClose(); }}
        title='Add Print Jobs'
        formKey='PrintJobsForm'
        open={open}
        FormView={<PrintJobsFormLogin
            onSubmit={() => {

                handleClose();
            }}

            formKey={"PrintJobsForm"} />}
    >
        <Button
            onClick={(e) => { e.preventDefault(); handleClickOpen(); }}
            color='primary'
            variant='contained'
            sx={{
                mx: th => th.spacing(3),
                whiteSpace: "nowrap"
            }}
        >

            New Print Jobs Draw

        </Button>


    </AlertDialogSlide>
    )
}


export default PrintJobsPage;

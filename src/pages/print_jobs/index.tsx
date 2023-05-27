
import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid } from '@mui/material';

// project import

// assets
import { useQuery } from '@tanstack/react-query';
import MainCard from '../../components/MainCard';
import AdvanceTable from '../../components/Tables';
import AnalyticEcommerce from '../../components/cards/statistics/AnalyticEcommerce';
import AlertDialogSlide from '../../components/modal/formDialog';
import { PrintClass } from '../../controllers/print';
import PrintJobsFormLogin from '../../layout/Forms/PrintForm';
import TableSearch from '../agent/searchInput';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const PrintJobsPage = () => {
    // const [value, setValue] = useState('today');
    // const [slot, setSlot] = useState('week');

    let printClass = new PrintClass();
    const { data } = useQuery(['getAllPrintJobs'], () => printClass.getAllPrintJobs(), {
        staleTime: 1000 * 10 // keep cache for minute
    });


    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="All Print Jobs" count={`${data?.length ?? 0}`} percentage={59.3} extra=" " />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Print Jobs" count="78,250" percentage={70.5} extra=" " />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Seen Print Jobs" count="18,800" percentage={27.4} isLoss color="warning" extra=" " />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Completed Print Jobs" count="35,078" percentage={27.4} isLoss color="success" extra=" " />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid
                        item
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <TableSearch />
                        <DialogButton />
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <AdvanceTable DATALIST={data ?? []} DataType="PrintType" />
                </MainCard>
            </Grid>
        </Grid>
    );
};

function DialogButton() {
    const [open, setOpen] = useState<boolean>(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    useEffect(() => {}, [open]);

    return (
        <AlertDialogSlide
            handleClose={(e) => {
                e.preventDefault();
                handleClose();
            }}
            title="Add Print Jobs"
            formKey="PrintJobsForm"
            open={open}
            FormView={
                <PrintJobsFormLogin
                    onSubmit={() => {
                        handleClose();
                    }}
                    formKey={'PrintJobsForm'}
                />
            }
        >
            <Button
                onClick={(e) => {
                    e.preventDefault();
                    handleClickOpen();
                }}
                color="primary"
                variant="contained"
                sx={{
                    mx: (th) => th.spacing(3),
                    whiteSpace: 'nowrap'
                }}
            >
                New Print Jobs
            </Button>
        </AlertDialogSlide>
    );
}

export default PrintJobsPage;

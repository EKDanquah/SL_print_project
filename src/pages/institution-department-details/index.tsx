// material-ui
import { Button, Grid } from '@mui/material';

// project import
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import MainCard from '../../components/MainCard';
import AdvanceTable from '../../components/Tables';
import AlertDialogSlide from '../../components/modal/formDialog';
import { PrintClass } from '../../controllers/print';
import NewAdminForm from '../../layout/Forms/NewInstitutionUserForm';
import NewDepartmentForm from '../../layout/Forms/NewDepartmentForm';
import TableSearch from '../agent/searchInput';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //

const InstitutionDetails = () => {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navigate back to the previous route
    };
    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    useEffect(() => {}, [open]);
    // const [slot, setSlot] = useState('week');

    let printClass = new PrintClass();
    const { data } = useQuery(['getAllPrintJobs'], () => printClass.getAllPrintJobs(), {
        staleTime: 1000 * 10 // keep cache for minute
    });

    return (
        <MainCard
            title={
                <Button
                    onClick={() => {
                        goBack();
                    }}
                    variant="text"
                    startIcon={<ArrowLeftOutlined />}
                >
                    Back
                </Button>
            }
        >
            <Grid item xs={12} md={12} lg={12}>
                <Grid sx={{ mt: 2 }} container spacing={5}>
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
                                <DepartmentDialog />
                            </Grid>
                            <Grid item />
                        </Grid>
                        <MainCard sx={{ mt: 2 }} content={false}>
                            <AdvanceTable DATALIST={data ?? []} DataType="PrintType" />
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

function DepartmentDialog() {
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
            title="Add admin to"
            formKey="DepartmentForm"
            open={open}
            FormView={
                <NewAdminForm
                    onSubmit={() => {
                        handleClose();
                    }}
                    formKey={'DepartmentForm'}
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
                New User
            </Button>
        </AlertDialogSlide>
    );
}

export default InstitutionDetails;

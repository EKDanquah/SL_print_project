// material-ui
import { Box, Button, Grid } from '@mui/material';

// project import
import { useEffect, useState } from 'react';
import DepartmentGrid from '../../components/DepartmentCard';
import MainCard from '../../components/MainCard';
import AlertDialogSlide from '../../components/modal/formDialog';
import { InstitutionDepartmentType } from '../../schema/schema';
import NewDepartmentForm from '../../layout/Forms/NewDepartmentForm';
import TableSearch from '../agent/searchInput';
import AdvanceTable from '../../components/Tables';
import PrintJobsFormLogin from '../../layout/Forms/PrintForm';
import { PrintClass } from '../../controllers/print';
import { useQuery } from '@tanstack/react-query';
import NewAdminForm from '../../layout/Forms/NewInstitutionUserForm';
import { DepartmentClass } from '../../controllers/departments';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

// ==============================|| SAMPLE PAGE ||============================== //

const InstitutionDetails = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const ministryId = searchParams.get('id');

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    useEffect(() => {}, [open]);
    // const [slot, setSlot] = useState('week');

    let printClass = new PrintClass();
    const { data } = useQuery([`getAllPrintJobs(${ministryId})`], () => printClass.getAllPrintJobs(ministryId as string), {
        staleTime: 1000 * 10 // keep cache for minute
    });

    let department = new DepartmentClass();

    const { data: departments } = useQuery(
        [`getAllDepartmentsByMinistry-${ministryId}`],
        () => department.getAllDepartmentsByMinistry(ministryId as string),
        {
            staleTime: 1000 * 10 // keep cache for minute
        }
    );
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navigate back to the previous route
    };

    return (
        <MainCard
            title={
                <Box sx={{ display: 'flex' }}>
                    <Button
                        onClick={() => {
                            goBack();
                        }}
                        variant="text"
                        startIcon={<ArrowLeftOutlined />}
                    >
                        Back
                    </Button>
                    <AlertDialogSlide
                        handleClose={(e) => {
                            e.preventDefault();
                            handleClose();
                        }}
                        title="Add Department"
                        formKey="NewDepartmemtForm"
                        open={open}
                        FormView={
                            <NewDepartmentForm
                                onSubmit={() => {
                                    handleClose();
                                }}
                                formKey={'NewDepartmemtForm'}
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
                            New Department
                        </Button>
                    </AlertDialogSlide>
                </Box>
            }
        >
            <Grid item xs={12} md={12} lg={12}>
                <Grid sx={{ mt: 2 }} container spacing={5}>
                    {departments?.map((dep, i) => (
                        <Grid item key={i} xs={6} md={3} lg={2} flex={1}>
                            <DepartmentGrid department={dep} ministryId={ministryId as string} />
                        </Grid>
                    ))}
                </Grid>
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
                                <DialogButton />
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

function DialogButton() {
    const [searchParams] = useSearchParams();
    const ministryId = searchParams.get('id');

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
                    departmentId={''}
                    ministryId={ministryId as string}
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

export default InstitutionDetails;

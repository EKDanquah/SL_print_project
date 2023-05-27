// material-ui
import {
    Button,
    Grid,
    Pagination,
    Stack
} from '@mui/material';

import MainCard from '../../components/MainCard';

// assets
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import MinistryGrid from '../../components/MinistryCard';
import AlertDialogSlide from '../../components/modal/formDialog';
import { MiniatryClass } from '../../controllers/ministry';
import AddMinistryForm from '../../layout/Forms/NewMinistryForm';
import Search from '../../layout/MainLayout/Header/HeaderContent/Search';

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

const CustomerInsightPage = () => {
    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');
    let ministryClass = new MiniatryClass();

    const { data } = useQuery(['getAllMinistries'], () => ministryClass.getAllMinistries(), {
        staleTime: 1000 * 10 // keep cache for minute
    });
    // if(!data)
    // return(<div>loading</div>)

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                 
                    <Grid
                        item
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Search />
                        <DialogButton />
                    </Grid>
                    <Grid item />
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                    {/* <MainCard sx={{ mt: 2 }} content={false}> */}
                        <Grid sx={{ mt: 2 }} container spacing={5}>
                            {data?.map((v, i) => (
                                <Grid item key={i} xs={12} md={4} lg={3} >
                                    <MinistryGrid ministry={v}/>
                                </Grid>
                            ))}
                        </Grid>
                    {/* </MainCard> */}
                    <MainCard sx={{ mt: 2 }}>
                        <Stack spacing={3}>
                            <Stack alignItems="flex-end">
                                <Pagination count={10} variant="outlined" />
                            </Stack>
                        </Stack>
                    </MainCard>
                </Grid>
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
            title="Add Ministry"
            formKey="NewMinistryForm"
            open={open}
            FormView={
                <AddMinistryForm
                    onSubmit={() => {
                        handleClose();
                    }}
                    formKey={'NewMinistryForm'}
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
                New Ministry
            </Button>
        </AlertDialogSlide>
    );
}

export default CustomerInsightPage;

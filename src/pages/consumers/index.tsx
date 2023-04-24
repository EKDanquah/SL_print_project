// material-ui
import { Button, Grid } from '@mui/material';


import MainCard from '../../components/MainCard';

// assets
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getConsumers } from '../../api';
import AlertDialogSlide from '../../components/modal/formDialog';
import AdvanceTable from '../../components/Tables';
import AddUserFormLogin from '../../layout/Forms/UsersForm';
import { SearchContextProvider } from './searchContext';
import TableSearch from './searchInput';


const CustomerPage = () => {

    const { data, error, isLoading, } = useQuery(['getConsumers'], getConsumers, {
        staleTime: 1000 * 10// keep cache for minute
    });

    useEffect(() => {
        console.log(data)
    }, [data]);

    return (
        <SearchContextProvider>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
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
                            DataType="CustomerType"
                        />
                    </MainCard>
                </Grid>
            </Grid>
        </SearchContextProvider>
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
        title='Add Consumer'
        formKey='CustomerForm'
        open={open}
        FormView={<AddUserFormLogin
            onSubmit={() => {

                handleClose();
            }}
            userType='Customer' formKey={"CustomerForm"} />}
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

            New Customer

        </Button>
    </AlertDialogSlide>
    )
}

export default CustomerPage;

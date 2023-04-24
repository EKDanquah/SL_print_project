import { PrintJobsTicket } from "../../schema/fomikSchema";
// material-ui
import {
    Avatar,
    Button,
    Divider,
    FormHelperText,
    Grid, InputLabel, List, ListItem, ListItemAvatar, ListItemText, OutlinedInput, Stack, TextField, Typography
} from '@mui/material';


// third party

import { Timestamp } from "firebase/firestore/lite";
import { Formik } from 'formik';
import { addPrintJobs } from "../../api";
import { PrintJobsItemType, PrintJobsType } from "../../schema/schema";
import { useState } from "react";
import CustomTextField from "./CustomImput";

// project import

type AddPrintJobsFormLoginType = {

    formKey: string,
    onSubmit: () => void
}

function PrintJobsFormLogin({ formKey, onSubmit }: AddPrintJobsFormLoginType) {

    return (
        <>
            <Formik
                initialValues={{
                    rafflePromoName: "",
                    raffles: [] as PrintJobsItemType[],
                    startDate: "",
                    minimumEligiblePrintJobsCount: 0,
                }}
                validationSchema={PrintJobsTicket}
                onSubmit={async ({
                    rafflePromoName,
                    raffles,
                    startDate,
                    minimumEligiblePrintJobsCount,
                }, { setErrors, setStatus, setSubmitting }) => {

                    try {


                        let print_jobs: PrintJobsType = {
                            rafflePromoName,
                            raffles,
                            created_at: Timestamp.fromMillis(Date.now()),
                            startDate,
                            minimumEligiblePrintJobsCount,
                        }

                        await addPrintJobs({ data: print_jobs }).then((r) => {

                            if (r.data.uid as string) {

                            }
                            onSubmit();
                        }).catch((e) => {
                            console.log(e)
                        })


                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        setStatus({ success: false });
                        // @ts-ignore
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }

                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, setValues, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} id={formKey}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name-usr">Referral Name</InputLabel>
                                    <OutlinedInput

                                        id="name-usr"
                                        type="name"
                                        value={values.rafflePromoName}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter referral name"
                                        fullWidth
                                        error={Boolean(touched.rafflePromoName && errors.rafflePromoName)}
                                    />
                                    {touched.rafflePromoName && errors.rafflePromoName && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.rafflePromoName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-usr">Print Jobs Start</InputLabel>
                                    <TextField
                                        id="datetime-local"
                                        label="Start Date"
                                        type="datetime-local"
                                        value={values.startDate}
                                        defaultValue="2017-05-24T10:30"
                                        sx={{ width: 250 }}
                                        name="startDate"
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    {touched.startDate && errors.startDate && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.startDate}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name-usr">Referral minimum eligible count</InputLabel>
                                    <OutlinedInput
                                        id="name-usr"
                                        type="number"
                                        value={values.minimumEligiblePrintJobsCount}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter referral name"
                                        fullWidth
                                        error={Boolean(touched.minimumEligiblePrintJobsCount && errors.minimumEligiblePrintJobsCount)}
                                    />
                                    {touched.minimumEligiblePrintJobsCount && errors.minimumEligiblePrintJobsCount && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.minimumEligiblePrintJobsCount}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption">Print Jobs Tickets Item</Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                {/* imageUrl
                                name
                                details
                                  */}
                                <PrintJobsItemForm />
                                <Stack spacing={1}>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    k
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                        </ListItem>
                                    </List>
                                </Stack>
                            </Grid>


                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

function PrintJobsItemForm() {

    const [print_jobs, setPrintJobs] = useState<PrintJobsItemType>();
    function onImagePicked(e: any
    ) {
        // getting a hold of the file reference
        // @ts-ignore
        var file = e.target.files[0];

        // setting up the reader
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        // here we tell the reader what to do when it's done reading...

        // @ts-ignore
        reader.onload = readerEvent => {
            // @ts-ignore
            var imageUrl = readerEvent.target.result; // this is the content!
            //    @ts-ignore
            setPrintJobs({ ...print_jobs, imageUrl })
        }

    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel htmlFor="name-usr">Name</InputLabel>
                    <OutlinedInput

                        id="name-usr"
                        type="name"
                        value={print_jobs?.name ?? ""}
                        name="name"
                        onChange={(e) => {

                            let name = e.currentTarget.value as string
                            // @ts-ignore
                            setPrintJobs({ ...print_jobs, name })
                        }}
                        placeholder="Enter Item name"
                        fullWidth
                    />

                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel htmlFor="name-usr">Referral Name</InputLabel>
                    <OutlinedInput

                        id="name-usr"
                        type="file"
                        value={print_jobs?.imageUrl ?? ""}
                        name="name"
                        onChange={onImagePicked}
                        placeholder="Enter Item name"
                        fullWidth />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={1}  >
                    <InputLabel htmlFor="name-usr">Referral details</InputLabel>
                    <CustomTextField
                        onTextAreaChange={(e) => {
                            let details = e.currentTarget.value
                            // @ts-ignore
                            setPrintJobs({ ...print_jobs, details })
                        }}
                    />
                </Stack>
            </Grid>

            <Grid item xs={12} style={{ display: "flex" }}>
                <Button
                    style={{ alignSelf: "flex-end" }}
                    onClick={() => {

                    }}
                >
                    Add ref
                </Button>
            </Grid>
        </Grid>
    );
}


export default PrintJobsFormLogin;

import printerImage from '../../assets/images/2396.png';
import { MinistryUserYupSchema, PrintYupSchema } from '../../schema/fomikSchema';
// material-ui
import {
    Box,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    LinearProgress,
    LinearProgressProps,
    ListItemIcon,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import './style.css';
// third party

import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { PrintClass } from '../../controllers/print';
import { PrintColor, PrintFileType } from '../../schema/schema';
import CustomTextField from './CustomImput';
import { InstitutionUsersClass } from '../../controllers/users';
import { useSearchParams } from 'react-router-dom';

// project import

type AddNewInstitutionUserFormType = {
    formKey: string;
    onSubmit: () => void;
};

function NewInstitutionUserForm({ formKey, onSubmit }: AddNewInstitutionUserFormType) {
    const [searchParams] = useSearchParams();
    const departmentId = searchParams.get('id');
    const insId = searchParams.get('insId');

    const [selectedValue, setSelectedValue] = useState('black and white');

    const _handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: ''
                }}
                validationSchema={MinistryUserYupSchema}
                onSubmit={async ({ firstName, lastName, email, phoneNumber }, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setSubmitting(true);

                        let institutionUser = new InstitutionUsersClass();

                        // let printFilesPath = await printClass.addPrintFilesToStorage(printFiles);

                        if (departmentId && insId) {
                            let path = await institutionUser.addInstitutionUsers({
                                created_at: new Date(),
                                fname: firstName,
                                email,
                                phoneNumber,
                                isVerified: true,
                                lname: lastName,
                                departmentID: departmentId,
                                institutionId: insId
                            });
                            alert(path);
                        }else{
                            alert(`invalid institution  ${insId} or department  ${departmentId}`)
                        }

                    } catch (err) {
                        alert(`${err}`);
                        setStatus({ success: false });
                        // @ts-ignore
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, setValues, isSubmitting, touched, values }) => {
                    return (
                        <form noValidate onSubmit={handleSubmit} id={formKey}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-usr">First Name</InputLabel>

                                        <OutlinedInput
                                            autoFocus
                                            id="name-usr"
                                            type="name"
                                            value={values.firstName}
                                            name="firstName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter printing title"
                                            fullWidth
                                            error={Boolean(touched.firstName && errors.firstName)}
                                        />

                                        {touched.firstName && errors.firstName && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.firstName}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-usr">Last Name</InputLabel>

                                        <OutlinedInput
                                            autoFocus
                                            id="name-usr"
                                            type="name"
                                            value={values.lastName}
                                            name="lastName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter last name"
                                            fullWidth
                                            error={Boolean(touched.lastName && errors.lastName)}
                                        />

                                        {touched.lastName && errors.lastName && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.lastName}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-usr">Email</InputLabel>

                                        <OutlinedInput
                                            autoFocus
                                            id="name-usr"
                                            type="name"
                                            value={values.email}
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter email"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                        />

                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-usr">Phone Number</InputLabel>

                                        <OutlinedInput
                                            autoFocus
                                            id="name-usr"
                                            type="name"
                                            value={values.phoneNumber}
                                            name="phoneNumber"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter phone number"
                                            fullWidth
                                            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                        />

                                        {touched.phoneNumber && errors.phoneNumber && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.phoneNumber}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
}

function Dropzone({ setValues, value, error }: { setValues: (val: File[]) => void; value: File[]; error: string | null }) {
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true
    });

    const files = (acceptedFiles.length > 0 ? acceptedFiles : value).map((file) => (
        // @ts-ignore
        <li key={file.path}>
            {/* @ts-ignore */}
            {file.path} - {file.size} bytes
        </li>
    ));

    useEffect(() => {
        setValues(acceptedFiles);
    }, [acceptedFiles, error]);

    return (
        <Grid item xs={12}>
            <div className="container">
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here</p>
                    <button type="button" onClick={open}>
                        Open File Dialog
                    </button>
                </div>
                <aside>
                    <h4>Files</h4>
                    <ul>{files}</ul>
                </aside>
            </div>
            {error && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                    {error}
                </FormHelperText>
            )}
        </Grid>
    );
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

export default NewInstitutionUserForm;

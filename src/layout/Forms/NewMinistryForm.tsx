import { MinistryYupSchema } from '../../schema/fomikSchema';
// material-ui
import {
    Box,
    CardActionArea,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    LinearProgress,
    LinearProgressProps,
    OutlinedInput,
    SelectChangeEvent,
    Stack,
    Typography
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import './style.css';
// third party

import { FileAddFilled } from '@ant-design/icons';
import { blue } from '@mui/material/colors';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { PrintClass } from '../../controllers/print';
import { PrintColor, PrintFileType } from '../../schema/schema';
import { MiniatryClass } from '../../controllers/ministry';

// project import

type AddMinistryFormType = {
    formKey: string;
    onSubmit: () => void;
};

function AddMinistryForm({ formKey, onSubmit }: AddMinistryFormType) {
    const [selectedValue, setSelectedValue] = useState('black and white');

    const _handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phoneNumber: '',
                    printFile: {} as any
                }}
                validationSchema={MinistryYupSchema}
                onSubmit={async ({ printFile, name, email, phoneNumber }, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setSubmitting(true);
                        let ministryClass = new MiniatryClass();
                        let printFilesPath = await ministryClass.addPrintFilesToStorage([printFile]);

                        ministryClass.addMinistry({
                            email,
                            isApproved: true,
                            phoneNumber,
                            photoUrl: printFilesPath[0],
                            created_at: new Date(),
                            name
                        });
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
                                <Grid item md={2} xs={12}>
                                    <ProfileUpdate
                                        value={values.printFile}
                                        setValues={(files) => {
                                            // alert(files.length)
                                            setValues({ ...values, printFile: files });
                                        }}
                                    />

                                    {touched.printFile && errors.printFile && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.printFile.toString()}
                                        </FormHelperText>
                                    )}
                                </Grid>

                                <Grid
                                    item
                                    md={10}
                                    xs={12} 
                                >
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-usr">Ministry Name</InputLabel>
                                        <OutlinedInput
                                            autoFocus
                                            id="name-usr"
                                            type="name"
                                            value={values.name}
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter ministry name"
                                            fullWidth
                                            error={Boolean(touched.name && errors.name)}
                                        />

                                        {touched.name && errors.name && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.name}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item md={6} xs={23}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-usr">Email</InputLabel>
                                        <OutlinedInput
                                            id="name-usr"
                                            type="email"
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

                                <Grid item md={6} xs={23}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-usr">Phone number</InputLabel>
                                        <OutlinedInput
                                            id="name-usr"
                                            type="phone"
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

function isFile(value: any): value is File {
    return value instanceof File;
}

function ProfileUpdate({ value, setValues }: { value: File; setValues: (file: File) => void }) {
    const [uploadState, setUploadState] = useState('initial');
    const [image, setImage] = useState('');

    useEffect(() => {
        const reader = new FileReader();
        // if (value != null ) {
        //     reader.readAsDataURL(value);
        //     reader.onloadend = function (e) {
        //         setImage(reader.result as any);
        //         setUploadState('uploaded');
        //     };
        // }
    }, [value]);

    const handleUploadClick = (event: any) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        if (file) {
            setValues(file);
            reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                setImage(reader.result as any);
                setUploadState('uploaded');
            };
        }
    };

    const handleResetClick = (event: any) => {
        setImage(null as any);
        setUploadState('initial');
    };

    return (
        <Box sx={{ width: '100px', height: '100px' }}>
            {uploadState === 'uploaded' ? (
                <CardActionArea onClick={handleResetClick}>
                    <img
                        style={{
                            width: '100px',
                            height: '100px '
                        }}
                        src={image}
                        alt="LOGO"
                    />
                </CardActionArea>
            ) : (
                <Box sx={{}}>
                    <Box
                        style={{
                            border: '1px solid ',
                            width: '100px',
                            height: '100px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <input
                            accept="image/jpeg,image/png,image/tiff,image/webp"
                            style={{
                                display: 'none'
                            }}
                            id="contained-button-file"
                            name="logo"
                            type="file"
                            onChange={handleUploadClick}
                        />
                        <label htmlFor="contained-button-file" style={{ ...(uploadState === 'uploaded' && { display: 'none' }) }}>
                            <IconButton
                                component="span"
                                sx={{
                                    color: blue[900]
                                }}
                            >
                                <FileAddFilled />
                            </IconButton>
                        </label>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default AddMinistryForm;

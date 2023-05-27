import { DepartmentYupSchema } from '../../schema/fomikSchema';
// material-ui
import {
    Box,
    FormHelperText,
    Grid,
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

import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { PrintClass } from '../../controllers/print';
import { DepartmentClass } from '../../controllers/departments';
import { useSearchParams } from 'react-router-dom';

// project import

type NewDepartmentFormType = {
    formKey: string;
    onSubmit: () => void;
};

function NewDepartmentForm({ formKey, onSubmit }: NewDepartmentFormType) {
    const [searchParams] = useSearchParams();
    const departmentId = searchParams.get('id');

    const [selectedValue, setSelectedValue] = useState('black and white');

    const _handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <Formik
                initialValues={{
                    title: ''
                }}
                validationSchema={DepartmentYupSchema}
                onSubmit={async ({ title }, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setSubmitting(true);

                        let department = new DepartmentClass();

                        if (departmentId) {
                            let path = await department.addDepartments({
                                created_at: new Date(),
                                institutionID: departmentId,
                                title
                            });

                            alert(path);
                        }else{
                            alert("invalid Department");
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
                            <Grid container spacing={3} sx={{ minWidth: { md: 500 } }}>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-usr">Title</InputLabel>

                                        <OutlinedInput
                                            autoFocus
                                            id="name-usr"
                                            type="name"
                                            value={values.title}
                                            name="title"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter printing title"
                                            fullWidth
                                            error={Boolean(touched.title && errors.title)}
                                        />

                                        {touched.title && errors.title && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.title}
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

export default NewDepartmentForm;

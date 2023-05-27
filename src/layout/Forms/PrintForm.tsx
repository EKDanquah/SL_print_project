import printerImage from '../../assets/images/2396.png';
import { PrintYupSchema } from '../../schema/fomikSchema';
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

// project import

type AddPrintJobsFormLoginType = {
    formKey: string;
    onSubmit: () => void;
    ministryId: string,
    departmentId: string,
};

function PrintJobsFormLogin({ formKey, onSubmit, ministryId, departmentId }: AddPrintJobsFormLoginType) {
    const [selectedValue, setSelectedValue] = useState('black and white');

    const _handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <Formik
                initialValues={{
                    title: '',
                    instruction: '',
                    printFiles: [] as File[],
                    printFileSizes: [] as string[],
                    quantity: '',
                    printFileType: [] as string[],
                    printColor: 'black and white',
                    deadLine: null as Date | null

                }}
                validationSchema={PrintYupSchema}
                onSubmit={async (
                    { title, instruction, printFiles, printFileSizes, quantity, printFileType, printColor, deadLine },
                    { setErrors, setStatus, setSubmitting }
                ) => {
                    try {
                        setSubmitting(true);

                        let printClass = new PrintClass();

                        let printFilesPath = await printClass.addPrintFilesToStorage(printFiles);

                        let path = await printClass.addPrint({
                            created_at: new Date(),
                            deadLine: deadLine as Date,
                            instruction,
                            printColor: printColor as PrintColor,
                            printActivities: 'SEND',
                            printFileSizes,
                            printFileType: printFileType as PrintFileType[],
                            printFileURL: printFilesPath,
                            quantity,
                            title,
                            fromInstitutionId:ministryId,
                            fromInstitutionDepartmentId:departmentId
                        });

                        alert(path);
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
                                <Grid item xs={8}>
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
                                <Grid item xs={4}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-usr">File/s Type</InputLabel>
                                        <FormControl fullWidth variant="outlined">
                                            <Select
                                                multiple
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="printFileType"
                                                value={values.printFileType}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={'png'}>.png</MenuItem>
                                                <MenuItem value={'jpg'}>.jpg</MenuItem>
                                                <MenuItem value={'pdf'}>.pdf</MenuItem>
                                                <MenuItem value={'jpeg'}>.jpeg</MenuItem>
                                                <MenuItem value={'docx'}>.docx</MenuItem>
                                                <MenuItem value={'slxs'}>.slxs</MenuItem>
                                                <MenuItem value={'other'}>other</MenuItem>
                                            </Select>
                                        </FormControl>

                                        {touched.printFileType && errors.printFileType && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.printFileType}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Dropzone
                                    value={values.printFiles}
                                    setValues={(files) => {
                                        // alert(files.length)
                                        setValues({ ...values, printFiles: files });
                                    }}
                                    error={Boolean(touched.printFiles && errors.printFiles) ? (errors.printFiles as string) : null}
                                />
                                <Grid item xs={12}>
                                    <Divider>
                                        <Typography variant="caption">Print Jobs Preferences</Typography>
                                    </Divider>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-usr">Instruction </InputLabel>
                                        <CustomTextField
                                            value={values.instruction}
                                            onTextAreaChange={(e) => {
                                                let instruction = e.currentTarget.value;
                                                // @ts-ignore
                                                setValues({ ...values, instruction });
                                            }}
                                        />
                                    </Stack>

                                    {touched.instruction && errors.instruction && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.instruction}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-usr">Print Size</InputLabel>
                                        <FormControl fullWidth variant="outlined">
                                            <Select
                                                multiple
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={values.printFileSizes}
                                                name="printFileSizes"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                <MenuItem value={'4A0'}>4A0 – 1682 x 2378 mm</MenuItem>
                                                <MenuItem value={'2A0'}>2A0 – 1189 x 1682 mm</MenuItem>
                                                <MenuItem value={'A0'}>A0 – 841 x 1189 mm</MenuItem>
                                                <MenuItem value={'A1'}>A1 – 594 x 841 mm</MenuItem>
                                                <MenuItem value={'A2'}>A2 – 420 x 594 mm</MenuItem>
                                                <MenuItem value={'A3'}>A3 – 297 x 420 mm</MenuItem>
                                                <MenuItem value={'A4'}>A4 – 210 x 297 mm</MenuItem>
                                                <MenuItem value={'A5'}>A5 – 148 x 210 mm</MenuItem>
                                                <MenuItem value={'A6'}>A6 – 105 x 148 mm</MenuItem>
                                                <MenuItem value={'A7'}>A7 – 74 x 105 mm</MenuItem>
                                                <MenuItem value={'A8'}>A8 – 52 x 74 mm</MenuItem>
                                                <MenuItem value={'A9'}>A9 – 37 x 52 mm</MenuItem>
                                                <MenuItem value={'A10'}>A10 – 26 x 37 mm</MenuItem>
                                                <MenuItem value={'custom'}>custom</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {touched.printFileSizes && errors.printFileSizes && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.printFileSizes}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-usr">Print Quantity</InputLabel>
                                        <OutlinedInput
                                            id="name-usr"
                                            type="number"
                                            value={values.quantity}
                                            name="quantity"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter quantity to print"
                                            fullWidth
                                            error={Boolean(touched.quantity && errors.quantity)}
                                        />
                                        {touched.quantity && errors.quantity && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.quantity}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="email-usr">Print Color</InputLabel>

                                    <FormControl fullWidth>
                                        <Select
                                            fullWidth
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            value={values.printColor}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="printColor"
                                        >
                                            {['black and white', 'coloured'].map((name) => (
                                                <MenuItem key={name} value={name} sx={{ display: 'flex' }}>
                                                    <ListItemIcon
                                                        sx={{
                                                            ...(name !== 'coloured' && {
                                                                '-webkit-filter': ' grayscale(100%)',
                                                                filter: 'grayscale(100%)'
                                                            })
                                                        }}
                                                    >
                                                        <img src={printerImage} width={'50px'} height={'50px'} alt="" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {touched.printColor && errors.printColor && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.printColor}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-usr">Deadline Date</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="datetime-local"
                                            type="datetime-local"
                                            name="deadLine"
                                            value={values.deadLine}
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                        {touched.deadLine && errors.deadLine && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.deadLine as string}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                {/* {isSubmitting?"true":"false"}
                                {JSON.stringify(errors)}
                                {isSubmitting && (
                                    <Grid item xs={12}>
                                        <LinearProgressWithLabel value={100} />
                                    </Grid>
                                )} */}
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

export default PrintJobsFormLogin;

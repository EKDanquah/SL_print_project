import { UserYupSchema } from "../../schema/fomikSchema";
// material-ui
import {
    Checkbox,
    Divider, FormControlLabel, FormGroup, FormHelperText,
    Grid, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, Stack,
    Typography
} from '@mui/material';

// third party
import { Timestamp } from "firebase/firestore/lite";
import { Formik } from 'formik';
import { addAgent, addConsumer } from "../../api";
import { AgentType, CustomerType, RegionType } from "../../schema/schema";

// project import

type AddUserFormLoginType = {
    userType: "Agent" | "Customer",
    formKey: string,
    onSubmit: () => void
}
function AddUserFormLogin({ userType, formKey, onSubmit }: AddUserFormLoginType) {



    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    name: '',
                    phoneNumber: '',
                    sex: 'MALE',
                    location: {
                        region: '',
                        town: '',
                        street: '',
                        streetNO: 0,
                    }
                }}
                validationSchema={UserYupSchema}
                onSubmit={async ({
                    email,
                    name,
                    phoneNumber,
                    location,
                    sex
                }, { setErrors, setStatus, setSubmitting }) => {
                    try {

                        if (userType === 'Agent') {
                            let agent: AgentType = {
                                email,
                                name,
                                phoneNumber,
                                sex,
                                location: {
                                    region: location.region as RegionType,
                                    street: location.street,
                                    streetNO: location.streetNO,
                                    town: location.town,

                                },
                                created_at: Timestamp.fromMillis(Date.now()),
                            }


                            await addAgent({ data: agent }).then((r) => {
                                if (r.data.uid as string) {

                                }
                                onSubmit();
                            }).catch((e) => {
                                console.log(e)
                            })

                        } else {
                            let consumer: CustomerType = {
                                email,
                                name,
                                phoneNumber,
                                sex,
                                activePrintJobsToken: [],
                                usePrintJobsTokenCount: 0,
                                location: {
                                    region: location.region as RegionType,
                                    street: location.street,
                                    streetNO: location.streetNO,
                                    town: location.town,

                                },
                                created_at: Timestamp.fromMillis(Date.now()),
                            }
                            await addConsumer({ data: consumer }).then((r) => {
                                if (r.data.uid as string) {

                                }
                                onSubmit();
                            }).catch((e) => {
                                console.log(e)
                            })
                        }

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
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} id={formKey}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name-usr">{userType} Name</InputLabel>
                                    <OutlinedInput
                                        id="name-usr"
                                        type="name"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter users Name"
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
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel >Select {userType} Gender</InputLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        value={values.sex}
                                        name="sex"
                                        onChange={handleChange}
                                        row
                                    >
                                        <FormControlLabel value={"MALE"} control={<Radio />} label="Male" />
                                        <FormControlLabel value={"FEMALE"} control={<Radio
                                        />} label="Female" />
                                    </RadioGroup>
                                    {touched.sex && errors.sex && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.sex}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-usr">{userType} Email</InputLabel>
                                    <OutlinedInput
                                        id="email-usr"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
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
                                    <InputLabel htmlFor="phone-usr">{userType} Phone No.</InputLabel>
                                    <OutlinedInput
                                        id="phone-usr"
                                        type="phone"
                                        value={values.phoneNumber}
                                        name="phoneNumber"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        fullWidth
                                        error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-phone-usr">
                                            {errors.phoneNumber}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption">Location</Typography>
                                </Divider>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="phone-usr">{userType} Region</InputLabel>

                                    <Select
                                        error={Boolean(touched.location?.region && errors.location?.region)}
                                        value={values.location?.region}
                                        onChange={handleChange}
                                        displayEmpty
                                        name='location.region'
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Eastern Province"}>Eastern Province</MenuItem>
                                        <MenuItem value={"Northern Province"}>Northern Province</MenuItem>
                                        <MenuItem value={"Southern Province"}>Southern Province</MenuItem>
                                        <MenuItem value={"North West Province"}>North West Province</MenuItem>
                                    </Select>
                                    {touched.location?.region && errors.location?.region && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.location?.region}
                                        </FormHelperText>
                                    )}
                                </Stack>
                                {/* {JSON.stringify(errors)} */}
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="phone-usr">{userType} Town</InputLabel>
                                    <OutlinedInput
                                        id="phone-usr"
                                        type="phone"
                                        value={values.location.town}
                                        name="location.town"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter town name"
                                        fullWidth
                                        error={Boolean(touched.location?.town && errors.location?.town)}
                                    />
                                    {touched.location?.town && errors.location?.town && (
                                        <FormHelperText error id="standard-weight-helper-text-str-usr">
                                            {errors.location?.town}
                                        </FormHelperText>
                                    )}
                                </Stack>
                                {/* {JSON.stringify(errors)} */}
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="phone-usr">{userType} Street Name</InputLabel>
                                    <OutlinedInput
                                        id="phone-usr"
                                        type="phone"
                                        value={values.location.street}
                                        name="location.street"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter street name"
                                        fullWidth
                                        error={Boolean(touched.location?.street && errors.location?.street)}
                                    />
                                    {touched.location?.street && errors.location?.street && (
                                        <FormHelperText error id="standard-weight-helper-text-str-usr">
                                            {errors.location?.street}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="phone-usr">{userType} Street No</InputLabel>
                                    <OutlinedInput
                                        id="phone-usr"
                                        type="number"
                                        value={values.location.streetNO}
                                        name="location.streetNO"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Street number"
                                        fullWidth
                                        error={Boolean(touched.location?.streetNO && errors.location?.streetNO)}
                                    />
                                    {touched.location?.streetNO && errors.location?.streetNO && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.location?.streetNO}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AddUserFormLogin;

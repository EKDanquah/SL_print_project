import * as Yup from 'yup';
import { PrintColor } from './schema';

const PrintYupSchema = Yup.object().shape({
    title: Yup.string().required('Invalid title'),
    instruction: Yup.string(),
    printFiles: Yup.array().of(Yup.string().required('Minimum of one file is required')).min(1).required('Minimum of one file is required'),

    printFileSizes: Yup.array().of(Yup.string()).min(1).required('Minimum of one file size is required'),
    quantity: Yup.string().required('Please enter the amount of files to print'),
    printFileType: Yup.array().of(Yup.string()).min(1).required('Minimum of one file type is required'),
    printColor: Yup.mixed<PrintColor>().oneOf<PrintColor>(['black and white', 'coloured']),
    deadLine: Yup.date().required('Due date mus be set').nullable()
});

const MinistryYupSchema = Yup.object().shape({
    name: Yup.string().required('Invalid ministry name'),
    email: Yup.string().required('Invalid email address'),
    phoneNumber: Yup.string().required('invalid phone number'),
    printFile:  Yup.mixed().nullable().required('Ministry image is required'),

});


const MinistryUserYupSchema = Yup.object().shape({
    firstName: Yup.string().required('Invalid user first name'),
    lastName: Yup.string().required('Invalid user last name'),
    email: Yup.string().required('Invalid user email address'),
    phoneNumber: Yup.string().required('invalid user phone number'),
    // printFile:  Yup.mixed().nullable().required('Ministry image is required'),

});
const DepartmentYupSchema = Yup.object().shape({
    title: Yup.string().required('Invalid title'),
    
});

export { PrintYupSchema,MinistryYupSchema ,DepartmentYupSchema,MinistryUserYupSchema};

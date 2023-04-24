import * as Yup from 'yup';
import { RegionType, SexType } from './schema';

const UserYupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is not valid'),
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    location: Yup.object({
        region: Yup.mixed<RegionType>().oneOf<RegionType>(["Eastern Province",
            "Northern Province",
            "Southern Province",
            "North West Province"]),
        town: Yup.string().required('town is required'),
        street: Yup.string().required('Street is required'),
        streetNO: Yup.number().required('Street number is required'),
        sex: Yup.mixed<SexType>().oneOf<SexType>(["MALE", "FEMALE"]),
    })
});


const PrintJobsTicket = Yup.object().shape({
    rafflePromoName: Yup.string().required('Promo Name is not valid'),
    startDate: Yup.string().required("Start Date is Required"),
    minimumEligiblePrintJobsCount: Yup.number().moreThan(0).required('Eligibility print-jobs amount is required'),
    raffles: Yup.array().of(Yup.object().shape({
        imageUrl: Yup.string().required('Image Url is not valid'),
        name: Yup.string().required('Name is required'),
        details: Yup.string().required('Details is required'),
    }),).min(1).required("Minimum of one item is required")
});



export { UserYupSchema, PrintJobsTicket };
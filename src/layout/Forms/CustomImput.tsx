import { styled } from "@mui/system";
import { HTMLInputTypeAttribute, ReactElement } from "react";

const CustomTextFieldMultiLineMain = styled('div')(({ theme }) => ({
    marginTop: "10px",
    marginBottom: "10px",
    // backgroundColor: "white",
    color: "black",
    border: "1px solid white",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "nowrap",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[100],

    [theme.breakpoints.up("md")]: {
    },

}));

const CustomTextFieldMain = styled('div')(({ theme }) => ({
    height: "54px",
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    backgroundColor: "white",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
        height: "64px",
    },

}));

export enum textFieldVariant {
    outline = "outline",
    filled = "filled",
}

interface textFieldProps {
    helperText?: string;
    onTextAreaChange?: React.ChangeEventHandler<HTMLTextAreaElement>,

}

const CustomTextFieldMultiLine = styled("textarea")(({ theme }) => ({
    width: "100%",
    resize: "vertical",
    outline: "none",
    border: "none",
    "&:active": {

    },
    "&:focus": {
        outline: "none"
    },
    [theme.breakpoints.up("md")]: {
    },

}));


const CustomTextField: React.FC<textFieldProps> = (props) => {
    const { helperText, onTextAreaChange } = props;

    return (
        <CustomTextFieldMultiLineMain style={{
            width: "100%",
            // maxWidth: "300px" 
        }} onClick={(e) => {}}>
            <CustomTextFieldMultiLine placeholder={helperText}
                style={{
                    height: "180px"
                }}
                onChange={onTextAreaChange}
            />
        </CustomTextFieldMultiLineMain>
    );
};

export default CustomTextField;

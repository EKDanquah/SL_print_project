import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});



type AlertDialogSlidePropType = {
    title: string,
    formKey: string
    children: React.ReactElement | React.ReactElement[]
    FormView: React.ReactElement | React.ReactElement[]
    open: boolean,
    handleClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}
export default function AlertDialogSlide(
    {
        title,
        formKey,
        children: Children,
        FormView,
        open,
        handleClose,
    }: AlertDialogSlidePropType
) {


    return (
        <Box>
            <>
                {Children}
            </>


            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <Typography variant='h3'>{
                        title
                    }</Typography>
                </DialogTitle>
                <DialogContent>
                    {
                        FormView
                    }
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} >Cancel</Button>
                    <Button form={formKey} type="submit" >Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NotificationMessageType, NotificationType } from '../../types';
import { Theme, useTheme } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type ModalPropsType = NotificationMessageType & {
    openDialog: boolean;
    resetNotificationState?: () => void
}

export default function TransitionsModal(props: ModalPropsType) {
    const {
        openDialog = false, notificationType, Children, title,
        negativeActionText, negativeAction, positiveAction,
        positiveActionText, message, actionNeeded,
        resetNotificationState } = props;
    const theme = useTheme();


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openDialog}
                onClose={(s) => { if (!actionNeeded) { resetNotificationState?.(); } }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/* <Fade in={openDialog}> */}
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Box sx={{ mt: th => th.spacing(2) }}>
                        {message !== undefined ?
                            (<Typography variant='body2'>
                                {message}
                            </Typography>
                            ) :
                            Children && (Children)
                        }
                    </Box>
                    <Box sx={{

                        display: "flex",
                        sm: { flexDirection: "column", justifyContent: "center" },
                        flexDirection: "row",
                        mt: th => th.spacing(4),

                        justifyContent: "flex-end"


                    }}>
                        {positiveActionText &&
                            <Button
                                onClick={() => { positiveAction?.(); resetNotificationState?.() }}
                            // sx={{ backgroundColor: GetNNegativeTypeColor({ type: notificationType, theme }) }}
                            >
                                {positiveActionText}
                            </Button>
                        }

                        {negativeActionText && (<Button
                            onClick={() => { negativeAction?.(); resetNotificationState?.() }}
                            // ref={cancelButtonRef}
                            sx={{

                                color: GetNegativeTypeTextColor({ type: notificationType, theme }),
                                backgroundColor: GetNegativeTypeColor({ type: notificationType, theme }),
                                "&:hover": {
                                    color: GetNegativeTypeColor({ type: notificationType, theme })
                                }
                            }} >
                            {negativeActionText}
                        </Button>)
                        }

                    </Box>
                </Box>
                {/* </Fade> */}
            </Modal>
        </div>
    );
}


function GetNegativeTypeColor({ type, theme }: { type?: NotificationType, theme: Theme }) {

    switch (type) {
        case 'ERROR':
            return theme.palette.error.main
        case 'SUCCESS':
            return theme.palette.success.main
        case 'WARNING':
            return theme.palette.warning.main
    }
    return null;
}

function GetNegativeTypeTextColor({ type, theme }: { type?: NotificationType, theme: Theme }) {

    switch (type) {
        case 'ERROR':
            return theme.palette.common.white
        case 'SUCCESS':
            return theme.palette.common.white
        case 'WARNING':
            return theme.palette.common.white
    }
    return null;
}

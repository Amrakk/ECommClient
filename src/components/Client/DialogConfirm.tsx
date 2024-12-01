import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide, Fade } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

interface DialogConfirmProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    content: string;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Fade ref={ref} {...props} />;
  });

const DialogConfirm = ({ open, onClose, onConfirm, title, content } : DialogConfirmProps) => {
  
    return (
        <Dialog 
            TransitionComponent={Transition} 
            open={open} 
            onClose={onClose} 
            aria-labelledby="form-dialog-title"
            PaperProps={{
                style: {
                    borderRadius: 8,
                },
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogConfirm;
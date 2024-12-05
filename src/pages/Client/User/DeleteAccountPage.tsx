import { Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grow } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WarningIcon from '@mui/icons-material/Warning';
import { useState } from 'react';
import useUserActions from '@/hooks/Admin/Users/useUserActions';
import { RootState } from '@/stores/client/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const DeleteAccountPage = (props: any) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteAction } = useUserActions();
  const user = useSelector((state: RootState) => state.user);

  const handleDeleteAccount = () => {
    setIsLoading(true);
    deleteAction.mutateAsync(user!._id).then(() => {
      setIsLoading(false);
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }).catch(() => {
      setIsLoading(false);
      toast.error('Failed to delete account');
    });

  };

  return (
    <Grow in={props.valuePage === 2} timeout={500}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 500 }}>
          <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DeleteForeverIcon color="error" />
            Delete Account
          </Typography>

          <Typography variant="body1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningIcon color="warning" />
            Warning: This action cannot be undone. All your data will be permanently deleted.
          </Typography>

          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={handleClickOpen}
            fullWidth
          >
            Delete My Account
          </Button>

          <Dialog open={open} PaperProps={{
            sx: { borderRadius: 3 }
          }} onClose={handleClose}>
            <DialogTitle>Confirm Account Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete your account? This action cannot be reversed.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={handleDeleteAccount}
                color="error"
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </div>
    </Grow>

  );
};

export default DeleteAccountPage;
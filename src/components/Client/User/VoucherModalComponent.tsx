import {
    Modal,
    Box,
    Typography,
    IconButton,
    Paper,
    Fade,
    Tooltip,
  } from '@mui/material';
  import ContentCopyIcon from '@mui/icons-material/ContentCopy';
  import { useState } from 'react';

    interface VoucherModalProps {
        open: boolean;
        onClose: () => void;
        voucherCode: string;
    }
  
  const VoucherModal = ({ open, onClose, voucherCode } : VoucherModalProps) => {
    const [copied, setCopied] = useState(false);
  
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(voucherCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };
  
    return (
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fade in={open}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              outline: 'none',
              borderRadius: 2,
              maxWidth: 400,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Your Voucher Code
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                my: 3,
                p: 2,
                backgroundColor: 'grey.700',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" color="primary" sx={{ letterSpacing: 1 }}>
                {voucherCode}
              </Typography>
              <Tooltip title={copied ? "Copied!" : "Copy code"}>
                <IconButton onClick={handleCopy} color="primary">
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Use this code at checkout to redeem your offer
            </Typography>
          </Paper>
        </Fade>
      </Modal>
    );
  };
  export default VoucherModal;
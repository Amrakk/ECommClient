import { useState } from 'react';
import { 
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';


const VoucherCollectComponent = () => {
  const [collected, setCollected] = useState(false);

  const handleCollect = () => {
    setCollected(true);
    // Add your collection logic here
  };

  return (
    <Card sx={{ p: 1 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <LocalOfferIcon color="primary" />
          <Typography variant="h5">
            Special Offer
          </Typography>
        </Box>
        <Typography variant="h4" color="primary" gutterBottom>
          $20 OFF
        </Typography>
        <Typography color="text.secondary" mb={2}>
         Valid until {new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          Minimum spend $0. Terms and conditions apply.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleCollect}
          disabled={collected}
        >
          {collected ? 'Collected!' : 'Collect Now'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default VoucherCollectComponent;
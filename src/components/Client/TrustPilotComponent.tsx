import { Paper, Box, Rating, Typography, Stack } from '@mui/material';
import TrustpilotIcon from '@mui/icons-material/Verified'; // Or any similar icon
import { ColorSecondaryBlackOverlay } from '@/styles/ThemeColorClient';

const TrustpilotComponent = () => {
  return (
    <Paper 
      elevation={1}
      sx={{
        p: 2,
        maxWidth: 350,
        bgcolor: ColorSecondaryBlackOverlay(1),
        borderRadius: 3,
        display: 'flex',
        justifyContent: {lg: 'center', md: 'flex-start'},
      }}
    >
      <Stack spacing={1}>
        <Box display="flex" alignItems="center" gap={1}>
          <TrustpilotIcon sx={{ color: '#00b67a' }} />
          <Typography variant="subtitle1" fontWeight="bold">
            Verified by Trustpilot
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Rating 
            value={4.9}
            precision={0.1}
            readOnly
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#00b67a'
              }
            }}
          />
          <Typography variant="body1" fontWeight="bold">
            4.9
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Based on 6,000+ reviews
        </Typography>
      </Stack>
    </Paper>
  );
};

export default TrustpilotComponent;
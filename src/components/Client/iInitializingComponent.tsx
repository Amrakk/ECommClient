// src/components/LoadingScreen.tsx
import { Box, Backdrop, Typography, CircularProgress } from '@mui/material';
import { keyframes } from '@mui/system';
import { styled } from '@mui/material/styles';
import Logo from '@/assets/EComm-transparent.png';
import { ColorPrimary, ColorSecondary, ColorSecondaryBlackOverlay } from '@/styles/ThemeColorClient';

const pulse = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledLogo = styled('img')({

  marginBottom: 20,
  animation: `${pulse} 2s ease-in-out infinite`
});

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  marginTop: 16,
  fontWeight: 500,
  textAlign: 'center'
}));

interface LoadingScreenProps {
  open: boolean;
}

export const LoadingScreen = ({ open }: LoadingScreenProps) => {
  return (
    <Backdrop
      open={open}
      sx={{
        background: (theme) =>
          `linear-gradient(135deg, 
        ${ColorSecondaryBlackOverlay(1)} 0%, 
        rgb(5, 20, 19) 100%)`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: 'column',
        top: '70px', // Add top spacing for AppBar height
        height: 'calc(100% - 70px)'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <StyledLogo src={Logo} alt="Logo" />
      </Box>
    </Backdrop>
  );
};
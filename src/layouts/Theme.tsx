import { ColorPrimary, ColorSecondary } from "@/styles/ThemeColorClient";
import { createTheme, LinearProgress, responsiveFontSizes, styled } from "@mui/material";




const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#87e9e2',
            contrastText: '#051413',
        },
        secondary: {
            main: '#12988e',
            contrastText: '#051413',
        },
        divider: 'rgba(48, 242, 228, 0.4)',
        text: {
            primary: 'rgb(235, 248, 247)',
            secondary: 'rgba(235, 248, 247, 0.6)',
            disabled: 'rgba(235, 248, 247, 0.38)',
        },
        background: {
            default: '#051413',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    transition: 'transform 0.2s',
                    '&:active': {
                        transform: 'scale(0.95)'
                    },
                    borderRadius: '10px',
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: '#87e9e2',
                            boxShadow: '0 0 3px #87e9e2, 0 0 6px #87e9e2'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#87e9e2',
                            boxShadow: '0 0 3px #87e9e2, 0 0 6px #87e9e2'
                        }
                    }
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: ColorSecondary(0.1),
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                    },

                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 0 5px #87e9e2, 0 0 10px #87e9e2',
                        '&::before': {
                            opacity: 1,
                        }
                    },

                    '&:active': {
                        transform: 'scale(0.98) translateY(-4px)',
                        boxShadow: '0 0 3px #87e9e2, 0 0 6px #87e9e2',
                        '&::before': {
                            opacity: 0.2,
                        }
                    },

                    '& .MuiCardMedia-root': {
                        transition: 'transform 0.3s ease',
                    },

                    '&:hover .MuiCardMedia-root': {
                        transform: 'scale(1.05)',
                    }
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#051413', // Slightly lighter than theme background
                    color: 'rgb(235, 248, 248)',
                    borderBottom: '1px solid rgba(135, 233, 226, 0.12)', // Subtle border using primary color
                    minHeight: '70px',
                    height: '100%',
                },

            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: 'rgb(235, 248, 247)', // Set your desired default text color
                },
            },
        },
    },
})

export const StyledLinearProgress = styled(LinearProgress)(() => ({
    height: 4,
    backgroundColor: ColorPrimary(1),
    '& .MuiLinearProgress-bar': {
      backgroundColor: ColorSecondary(1),
    }
  }));
  

export default responsiveFontSizes(darkTheme);
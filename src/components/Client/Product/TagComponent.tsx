import { Chip, Box, Typography } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { ColorPrimary } from '@/styles/ThemeColorClient';

const TagComponent = ({ tags }: { tags: string[] }) => {
    return (
        <Box sx={{ mt: 10 }}>
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                <LocalOfferIcon fontSize="small" />
                Tags
            </Typography>

            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1
            }}>
                {tags.map((tag, index) => (
                    <Chip
                        key={index}
                        label={tag}
                        variant="outlined"
                        size="medium"
                        sx={{
                            borderRadius: '16px',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: ColorPrimary(0.5),
                                color: 'white',
                                transform: 'translateY(-2px)',
                                boxShadow: 1
                            }
                        }}
                    />
                ))}
            </Box>
        </Box>
    )
}
export default TagComponent;
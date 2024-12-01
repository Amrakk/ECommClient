import { Box, Typography, Rating, Stack, Skeleton } from '@mui/material';
import { orange, grey } from '@mui/material/colors';
import Grid from '@mui/material/Grid2';
import { IResGetProductRatingByProductId } from '@/apis/productRatings';


interface ReviewCardProps {
    totalResult?: IResGetProductRatingByProductId[]
}


const ReviewCard = ({ totalResult }: ReviewCardProps) => {
    let averageRating = 0;
    const ratings = new Map([
        [5, 0],
        [4, 0],
        [3, 0],
        [2, 0],
        [1, 0]
      ]);
    
    let isLoading = true;
    if (totalResult) {
        isLoading = false;
        averageRating = totalResult.reduce((acc, curr) => acc + curr.rating, 0) / totalResult.length;
        totalResult.forEach((result) => {
            ratings.set(Math.floor(result.rating), (ratings.get(Math.floor(result.rating)) || 0) + 1);
        });   
    }
    return (
        <Grid container spacing={2} sx={{
            maxWidth: 460,
            p: 2,
            bgcolor: grey[900],
            color: grey[50],
            border: '1px solid #444',
            borderRadius: '16px',
            boxShadow: 1,
        }}>
            <Grid size={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}  >
                {isLoading ? <Skeleton variant="rectangular" animation='wave' sx={{ borderRadius: 2 }} width={120} height={70} /> : (
                    <>
                        <Typography component="h2" variant="h4">
                            {averageRating} / 5
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Based on {totalResult?.length} Reviews
                        </Typography>
                        <Rating
                            name="read-only"
                            value={4.6}
                            precision={0.1}
                            readOnly
                            sx={{ color: orange[500] }}
                        />

                    </>
                )}
            </Grid>
            <Grid size={7}>
                {isLoading ? <Skeleton variant="rectangular" animation='wave' sx={{ borderRadius: 3 }} height={150} /> : (
                    <>
                        <Stack spacing={2.5} mt={2}>
                            {Array.from(ratings.entries()).map(([key, value]) => (
                                <Box key={key} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ width: '4rem', opacity: 0.5 }}>{key} Star</Typography>
                                    <Box sx={{
                                        width: '100%', mx: 1, height: 10, bgcolor: grey[800], borderRadius: '16px'
                                    }}>
                                        <Box
                                            sx={{
                                                height: '100%',
                                                width: `${(value / totalResult!.length) * 100}%`,
                                                bgcolor: orange[700],
                                                borderRadius: '16px'
                                            }}
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    </>
                )}
            </Grid>
        </Grid>

    );
}

export default ReviewCard;

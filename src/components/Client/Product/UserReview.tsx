import { Card, CardContent, Typography, Rating, Avatar, Stack, Skeleton } from '@mui/material';
import { deepOrange, grey } from '@mui/material/colors';
import { IResGetProductRatingByProductId } from '@/apis/productRatings';

interface UserReviewCardProps {
    review?: IResGetProductRatingByProductId,
}



const UserReviewCard = ({ review }: UserReviewCardProps) => {
    let isLoading = true;
    if (review) {
        isLoading = false;
    }

    return (
        <Card sx={{
            bgcolor: grey[900],
            color: grey[50],
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
            <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    {isLoading ? <Skeleton variant="circular" animation='wave' sx={{ width: 40, height: 40 }} /> : (
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>JD</Avatar>)}
                    {isLoading ? <Skeleton variant="text" animation='wave' sx={{ width: 100 }} /> : (
                        <Typography variant="subtitle1">{review?.user.name}</Typography>
                    )}
                </Stack>
                {isLoading ? <Skeleton variant="rounded" animation='wave' sx={{height:  70}} /> : (
                    <>
                        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                            <Typography variant="caption" color="text.secondary"> {new Date(review!.createdAt).toLocaleDateString()}</Typography>
                            <Rating name="read-only" value={review?.rating} readOnly precision={0.1} sx={{ mt: 1, mb: 2 }} />
                        </Stack>
                        <Typography variant="body1">
                            {review?.review}
                        </Typography>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

export default UserReviewCard;

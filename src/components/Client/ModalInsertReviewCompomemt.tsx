import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Rating,
    TextField,
    Button,
    Stack,
    Grow
} from '@mui/material';

interface ProductReviewModalProps {
    open: boolean;
    onClose: (e: React.MouseEvent) => void;
    productId: string;
    onSubmit: (rating: number, review: string, productId: string) => void;
}

const ProductReviewModalComponent: React.FC<ProductReviewModalProps> = ({
    open,
    onClose,
    onSubmit,
    productId
}) => {
    const [rating, setRating] = useState<number | null>(0);
    const [review, setReview] = useState('');

    const handleSubmit = () => {
        if (rating) {
            onSubmit(rating, review, productId);
            setRating(0);
            setReview('');
        }
    };

    return (
        <Modal open={open}  onClose={(e) => {
            onClose(e as React.MouseEvent);
        }}
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            <Grow in={open} timeout={300} >
                <Box
                    sx={{
                        maxWidth: '90vw',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="h2" gutterBottom>
                        Write Your Review
                    </Typography>

                    <Stack spacing={3}>
                        <Box>
                            <Typography component="legend">Rating</Typography>
                            <Rating
                                name="product-rating"
                                value={rating}
                                onChange={(_, newValue) => setRating(newValue)}
                                size="large"
                                precision={0.5}
                            />
                        </Box>

                        <TextField
                            label="Your Review"
                            multiline
                            rows={4}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            fullWidth
                        />

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button variant="outlined" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={!rating}
                            >
                                Submit Review
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Grow>

        </Modal>
    );
};

export default ProductReviewModalComponent;
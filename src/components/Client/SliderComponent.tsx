import { Box, Card, CardMedia } from "@mui/material";
import { FreeMode, Thumbs, Navigation, Autoplay } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from "react";
import { ProductDetail } from "@/models/product";


interface SliderComponentProps {
    product: ProductDetail;
}



const SliderComponent = ({product} : SliderComponentProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>();

    const navigationStyles = {
        '.swiper-button-next, .swiper-button-prev': {
            width: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            height: '40px',
            ml: { xs: 0, sm: 2 },
            mr: { xs: 0, sm: 2 },
            borderRadius: '30%',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            '&::after': {
                display: 'none', // Remove default arrow
            },
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
            }
        },
        '.swiper-button-disabled': {
            opacity: 0.2,
        }
    };
    return (
        <>
            <Box sx={navigationStyles}>
                {/* Main Image Swiper */}
                <Swiper
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                    spaceBetween={10}
                    autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
                >
                    <div className="swiper-button-prev">
                        <ArrowBackIosIcon
                            sx={{

                                ml: 1.5,
                                color: 'black',
                                p: 1
                            }} />
                    </div>
                    <div className="swiper-button-next">
                        <ArrowForwardIosIcon sx={{ color: 'black', p: 1 }} />
                    </div>
                    {product.images?.map((img, index) => (
                        <SwiperSlide key={index}>
                            <Card elevation={0}>
                                <CardMedia
                                    component="img"
                                    image={img || 'https://placehold.co/400x400'}
                                    alt={product.name}
                                    sx={{ height: 500, borderRadius: 0, objectFit: 'contain', bgcolor: 'grey.50' }}
                                />
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnail Swiper */}
                <Swiper
                    onSwiper={(swiper) => {
                        setThumbsSwiper(swiper)
                    }}
                    slidesPerView={5}
                    freeMode={true}
                    spaceBetween={15}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    style={{ marginTop: '1rem' }}
                >
                    {product.images?.map((img, index) => (
                        <SwiperSlide key={index}>
                            <Card sx={{ borderRadius: 2, maxWidth: 150 }}>
                                <CardMedia
                                    component="img"
                                    image={img}
                                    alt={`${product.name}-${index}`}
                                    sx={{ height: 70, objectFit: 'cover' }}
                                />
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </>
    )
};




export default SliderComponent;
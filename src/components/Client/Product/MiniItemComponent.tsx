import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ICartItemDetail } from '@/apis/carts';
import { convertToVietnameseDong } from '@/utils/convertToVnd';

interface MiniItemProps {
    item?: ICartItemDetail;
    productName?: string;
    productImage?: string[];
    productPrice?: number;
    productQuantity?: number;
    productVariant?: string;
}

const MiniItem = ({ item, productImage, productName, productPrice, productQuantity, productVariant } : MiniItemProps) => {
  

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
      <img
        src={ item !== undefined ? item.product.images[0] ?? "https://placehold.co/200x200" : productImage![0] ?? "https://placehold.co/200x200" }
        alt={ item !== undefined ? item.product.name : productName }
        style={{ width: 60, height: 60, objectFit: 'cover', marginRight: 16, borderRadius: 4 }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" noWrap sx={{ maxWidth: {xs: 150, sm: 250, md: 300} }}>
          { item !== undefined ? item.product.name : productName }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { item !== undefined ? item.variantId : productVariant }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          x{ item !== undefined ? item.quantity : productQuantity }
        </Typography>
      </Box>
      <Typography variant="body1">{
        item !== undefined ? convertToVietnameseDong(item.product.variants.find((v) => v.id === item.variantId)?.retailPrice ?? 0) : convertToVietnameseDong(productPrice!)
        }</Typography>
    </Box>
  );
};

export default MiniItem;
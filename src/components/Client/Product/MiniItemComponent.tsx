import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ICartItemDetail } from '@/apis/carts';
import { convertToVietnameseDong } from '@/utils/convertToVnd';

interface MiniItemProps {
    item: ICartItemDetail;
}

const MiniItem = ({ item} : MiniItemProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
      <img
        src={item.product.images[0] ?? "https://placehold.co/200x200"}
        alt={item.product.name}
        style={{ width: 60, height: 60, objectFit: 'cover', marginRight: 16, borderRadius: 4 }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" noWrap>
          {item.product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.variantId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          x{item.quantity}
        </Typography>
      </Box>
      <Typography variant="body1">{convertToVietnameseDong(item.product.variants.find((v) => v.id === item.variantId)?.retailPrice ?? 0)}</Typography>
    </Box>
  );
};

export default MiniItem;
import { 
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { IAddress } from '@/models/user';
import { ColorPrimary, ColorSecondaryBlackOverlay } from '@/styles/ThemeColorClient';

interface AddressCardProps {
  address: IAddress;
  onEdit: ( value?: string  ) => void;
  isSelected?: boolean;
  value?: string;
}

 const AddressCard = ( {address, onEdit, isSelected, value }: AddressCardProps) => {

    return (
        <Card 
        sx={{ 
          cursor: 'pointer',
          '&:hover': { boxShadow: 6 },
          height: '100%',
          padding: 1,
          backgroundColor: isSelected ?? false ? ColorSecondaryBlackOverlay(1) : ColorSecondaryBlackOverlay(0.3) ,
          borderRadius: 5,
          boxShadow: 3,
          border: isSelected ?? false ? `2px solid ${ColorPrimary(0.5)}` : '',
        }}
        onClick={ () => onEdit(value) }
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Address Information 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {(address.street)}<br />
            {(address.ward.name)}, {String(address.district.name)}<br />
            {(address.province.name)}, {"Vietnam"}<br />
            Contact: {String(address.contactInfo ?? "")}
          </Typography>
        </CardContent>
      </Card>
    )
}

export default AddressCard
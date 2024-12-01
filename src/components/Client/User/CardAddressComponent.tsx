import { 
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { IAddress } from '@/models/user';
import { ColorSecondaryBlackOverlay } from '@/styles/ThemeColorClient';


 const AddressCard = ({ address , onEdit }: {address: IAddress, onEdit: () => void}) => {

    return (
        <Card 
        sx={{ 
          cursor: 'pointer',
          '&:hover': { boxShadow: 6 },
          height: '100%',
          padding: 1,
          backgroundColor: ColorSecondaryBlackOverlay(0.3),
          borderRadius: 5,
          boxShadow: 3
        }}
        onClick={onEdit}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Address Information 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {(address.street)}<br />
            {(address.ward.name)}, {String(address.district.name)}<br />
            {(address.province.name)}, {"Vietnam"}<br />
            Contact: {String(address.contactInfo)}
          </Typography>
        </CardContent>
      </Card>
    )
}

export default AddressCard
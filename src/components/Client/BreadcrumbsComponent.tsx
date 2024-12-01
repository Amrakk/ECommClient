import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as NavigateLink, useLocation } from 'react-router-dom';

interface BreadcrumbsProps {
    customPath?: string[];
}

const BreadcrumbsComponent = ({ customPath }: BreadcrumbsProps) => {
    const location = useLocation();

    const getBreadcrumbs = () => {
        const pathnames = customPath || location.pathname.split('/').filter(x => x);

        return [
            { path: '/', label: 'Home' },
            ...pathnames.map((value, index) => ({
                path: `/${pathnames.slice(0, index + 1).join('/')}`,
                label: value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ')
            }))
        ];
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="medium" sx={{ color: 'grey.500' }} />}
            aria-label="breadcrumb"
            sx={{
                padding: '8px 16px',
                borderRadius: '4px',
            }}
        >
            {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return isLast ? (
                    <Typography
                        key={crumb.path}
                        sx={{ 
                            color: 'grey.100', fontWeight: 'bold' ,
                            maxWidth: 200,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {crumb.label}
                    </Typography>
                ) : (
                    <Link
                        key={crumb.path}
                        component={NavigateLink}
                        to={crumb.path}
                        underline="hover"
                        sx={{
                            color: 'grey.300',
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        {crumb.label}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default BreadcrumbsComponent;
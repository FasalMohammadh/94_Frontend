import { Link as RouterLink } from 'react-router-dom';

import { Link } from '@mui/material';

import SearchbarSection from '../../Components/SearchbarSection';

const FavoriteProduct = () => (
  <>
    <Link
      sx={{ letterSpacing: 3, textDecoration: 'none', display: 'block' }}
      variant='h4'
      fontWeight={900}
      color='text.primary'
      component={RouterLink}
      to='/favorite'
      mb={2}
    >
      Favorite Products
    </Link>

    <SearchbarSection />
  </>
);

export default FavoriteProduct;

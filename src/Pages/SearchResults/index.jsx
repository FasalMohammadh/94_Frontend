import { useEffect, useState } from 'react';

import { Link as RouterLink, useParams } from 'react-router-dom';

import { Link, Stack, Typography } from '@mui/material';

import SearchbarSection from '../../Components/SearchbarSection';
import ItemCard from './Components/ItemCard';

import axios from '../../Utils/Axios';

const SearchResults = () => {
  const { query } = useParams();

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get(`/products/search/?q=${query}`).then(({ data }) => {
      setFilteredProducts(data);
    });
  }, [query]);

  return (
    <>
      <Link
        sx={{ letterSpacing: 3, textDecoration: 'none', display: 'block' }}
        variant='h4'
        fontWeight={900}
        color='text.primary'
        component={RouterLink}
        to='/'
        mb={2}
      >
        PRODUCTS
      </Link>

      <SearchbarSection />

      <Typography variant='h6' component='p' color='text.secondary' mt={3}>
        {filteredProducts.length} results found for ‘{query}’
      </Typography>

      <Stack gap={2} mt={4}>
        {filteredProducts.map(product => (
          <ItemCard
            productDetails={{
              description: product.productDesc,
              name: product.productName,
              sku: product.SKU,
            }}
          />
        ))}
      </Stack>
    </>
  );
};

export default SearchResults;

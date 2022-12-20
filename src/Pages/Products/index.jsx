import { useCallback, useEffect, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from './../../Assets/Icons/delete-icon.svg';
import EditIcon from './../../Assets/Icons/edit-icon.svg';
import StarIcon from './../../Assets/Icons/star.svg';

import DeleteModal from '../../Components/Modals/DeleteModal';

import { setProducts } from './../../Redux/Reducers/ProductsSlice.js';

import { SERVER_URL } from '../../Server/config';

import axios from '../../Utils/Axios';
import SearchbarSection from '../../Components/SearchbarSection';

const StyledPrdImg = styled('img')({
  aspectRatio: '1',
  borderRadius: 6,
  width: 60,
});

const StyledPrdActionIcon = styled('img')({
  aspectRatio: '1',
  width: 20,
});

const StyledTableHeading = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

const Products = () => {
  const [productToBeDeleted, setProductToBeDeleted] = useState('');

  const { products } = useSelector(state => state.product);
  const dispatch = useDispatch();

  const fetchProducts = useCallback(() => {
    axios.get('/products').then(response => {
      dispatch(setProducts(response.data));
    });
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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

      {/* Product Table */}
      <TableContainer
        sx={{ maxWidth: '95%', mx: 'auto', mt: 4, maxHeight: '500px', mb: 4 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableHeading>SKU</StyledTableHeading>
              <StyledTableHeading>IMAGE</StyledTableHeading>
              <StyledTableHeading>PRODUCT NAME</StyledTableHeading>
              <StyledTableHeading>PRICE</StyledTableHeading>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map(product => (
              <TableRow key={product._id}>
                <Typography component={TableCell} color='text.secondary'>
                  #{product.SKU}
                </Typography>

                <TableCell>
                  <StyledPrdImg
                    src={`${SERVER_URL}/${product.image[0]}`}
                    alt='Product Image'
                  />
                </TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>$24.00</TableCell>
                <TableCell sx={{ textAlign: 'end' }}>
                  <IconButton
                    onClick={() => setProductToBeDeleted(product._id)}
                  >
                    <StyledPrdActionIcon src={DeleteIcon} alt='Delete Icon' />
                  </IconButton>
                  <IconButton
                    LinkComponent={RouterLink}
                    to={`/edit-product/${product._id}`}
                  >
                    <StyledPrdActionIcon src={EditIcon} alt='Edit Icon' />
                  </IconButton>
                  <IconButton>
                    <StyledPrdActionIcon src={StarIcon} alt='Favorite Icon' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteModal
        open={Boolean(productToBeDeleted)}
        onClose={() => setProductToBeDeleted('')}
        id={productToBeDeleted}
      />
    </>
  );
};

export default Products;

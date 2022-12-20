import { useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Link, styled } from '@mui/material';

import ArrowRight from './../../Assets/Icons/arrow.svg';

import Axios from '../../Utils/Axios';

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.light.main,
  borderRadius: 5,
  '.MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const NewProduct = () => {
  const [images, setImages] = useState([]);
  const [inputs, setInputs] = useState({
    sku: '',
    name: '',
    qty: '',
    desc: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setInputs(currentState => ({ ...currentState, [name]: value }));
  };

  const handleChangeImages = event => {
    setImages(Array.from(event.target.files));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      // creating multi-part formData
      const formData = new FormData();
      formData.set('sku', inputs.sku);
      formData.set('name', inputs.name);
      formData.set('qty', inputs.qty);
      formData.set('description', inputs.desc);
      images.forEach(image => formData.append('images', image));

      await Axios.post('/products', formData);
      alert('Product added successfully');
    } catch {
      alert('Something went wrong');
    }
  };

  return (
    <>
      <Breadcrumbs
        separator={<img src={ArrowRight} alt='Breadcrumbs separator' />}
        sx={{ mb: 2 }}
      >
        <Link
          sx={{ letterSpacing: 3, textDecoration: 'none' }}
          variant='h4'
          fontWeight={900}
          color='text.primary'
          component={RouterLink}
          to='/'
        >
          PRODUCTS
        </Link>
        <Link
          sx={{ textDecoration: 'none' }}
          component={RouterLink}
          to='/new-product'
        >
          Add new product
        </Link>
      </Breadcrumbs>

      <form style={{ paddingBottom: '40px' }} onSubmit={handleSubmit}>
        <Box
          display='grid'
          gridTemplateColumns='repeat(2,1fr)'
          rowGap={6}
          columnGap={10}
        >
          {/* SKU form field section */}
          <Grid container columns={8} rowSpacing={4} alignItems='center'>
            <Grid md={1}>
              <FormLabel>SKU</FormLabel>
            </Grid>
            <Grid md={7}>
              <StyledTextField
                fullWidth
                size='small'
                name='sku'
                onChange={handleChange}
                value={inputs.sku}
              />
            </Grid>
          </Grid>

          {/* to break to next row  */}
          <Box width='100%' />

          {/* name form field section */}
          <Grid container columns={8} rowSpacing={4} alignItems='center'>
            <Grid md={1}>
              <FormLabel>Name</FormLabel>
            </Grid>
            <Grid md={7}>
              <StyledTextField
                fullWidth
                size='small'
                name='name'
                onChange={handleChange}
                value={inputs.name}
              />
            </Grid>
          </Grid>

          {/* qty form field section */}

          <Grid container columns={8} spacing={4} alignItems='center'>
            <Grid md={1}>
              <FormLabel>QTY</FormLabel>
            </Grid>
            <Grid md={7}>
              <StyledTextField
                fullWidth
                size='small'
                name='qty'
                onChange={handleChange}
                value={inputs.qty}
              />
            </Grid>
          </Grid>

          {/* product desc form field section */}
          <Box gridColumn='1/span 2'>
            <FormLabel sx={{ display: 'block', mb: 1 }}>
              Product Description
            </FormLabel>

            <Typography
              component='span'
              display='block'
              color='text.secondary'
              mb={1}
              variant='caption'
              fontWeight={500}
            >
              A small description about the product
            </Typography>

            <StyledTextField
              size='small'
              fullWidth
              multiline
              rows={3}
              name='desc'
              onChange={handleChange}
              value={inputs.desc}
            />
          </Box>
        </Box>

        <Stack direction='row' mt={4} alignItems='flex-start' gap={4}>
          <Box>
            <Typography>Product Images</Typography>
            <Typography
              component='span'
              color='text.secondary'
              variant='caption'
              fontWeight={500}
            >
              JPEG, PNG, SVG or GIF
              <br />
              (Maximum file size 50MB)
            </Typography>
          </Box>
          {images.length ? (
            <Stack direction='row' gap={2}>
              {images.map((image, index) => {
                const tempImgURL = URL.createObjectURL(image);
                return (
                  <img
                    key={tempImgURL}
                    src={tempImgURL}
                    alt={`Product Img ${index + 1}`}
                    style={{
                      minWidth: 0,
                      objectFit: 'cover',
                      aspectRatio: '1',
                      maxHeight: '100px',
                      borderRadius: 10,
                    }}
                  />
                );
              })}
            </Stack>
          ) : (
            <Typography
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
              htmlFor='images'
              component='label'
              color='primary'
            >
              Add Images
            </Typography>
          )}

          <input
            type='file'
            id='images'
            style={{ display: 'none' }}
            onChange={handleChangeImages}
            multiple
          />
        </Stack>

        <Button
          type='submit'
          sx={{
            borderRadius: '6px',
            px: 5,
            ml: 'auto',
            display: 'table',
            mt: 5,
          }}
        >
          Add product
        </Button>
      </form>
    </>
  );
};

export default NewProduct;

import { useState, useEffect, useRef } from 'react';

import { Link as RouterLink, useParams } from 'react-router-dom';

import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import ArrowRight from './../../Assets/Icons/arrow.svg';

import ProductFormTopSection from '../../Components/ProductForm';

import axios from '../../Utils/Axios';

import { SERVER_URL } from '../../Server/config';

const EditProduct = () => {
  const [images, setImages] = useState([]);
  const [inputs, setInputs] = useState({
    sku: '',
    name: '',
    qty: '',
    desc: '',
  });

  const { productID } = useParams();
  const imageInputRef = useRef();

  useEffect(() => {
    axios
      .get(`/products/${productID}`)
      .then(({ data }) => {
        if (data) {
          setInputs({
            sku: data.SKU,
            name: data.productName,
            qty: data.quantity.toString(),
            desc: data.productDesc,
          });
          setImages(data.image.map(imageURL => `${SERVER_URL}/${imageURL}`));
        }
      })
      .catch(error => console.error(error));
  }, [productID]);

  const handleChange = ({ target: { name, value } }) => {
    setInputs(currentState => ({ ...currentState, [name]: value }));
  };

  const handleChangeImages = event => {
    setImages(
      Array.from(event.target.files).map(image => URL.createObjectURL(image))
    );
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
      //add images field only if new images were added
      if (imageInputRef.current.files.length)
        Array.from(imageInputRef.current.files).forEach(image =>
          formData.append('images', image)
        );

      await axios.put(`/products/${productID}`, formData);
    } catch (error) {
      console.error(error);
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
        <Link sx={{ textDecoration: 'none' }}>Edit product</Link>
      </Breadcrumbs>

      <form style={{ marginBottom: '2em' }} onSubmit={handleSubmit}>
        <ProductFormTopSection inputValues={inputs} onChange={handleChange} />

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

          <Stack direction='row' gap={2}>
            {images.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Product Img ${index + 1}`}
                style={{
                  minWidth: 0,
                  objectFit: 'cover',
                  aspectRatio: '1',
                  maxHeight: '100px',
                  borderRadius: 10,
                }}
              />
            ))}
          </Stack>
          <Typography
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            htmlFor='images'
            component='label'
            color='primary'
          >
            Edit Images
          </Typography>

          <input
            type='file'
            id='images'
            style={{ display: 'none' }}
            onChange={handleChangeImages}
            multiple
            ref={imageInputRef}
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
          Save changes
        </Button>
      </form>
    </>
  );
};

export default EditProduct;

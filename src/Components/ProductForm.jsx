import React from 'react';

import { Box, FormLabel, styled, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import PropTypes from 'prop-types';

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.light.main,
  borderRadius: 5,
  '.MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const ProductFormTopSection = ({ onChange, inputValues }) => {
  return (
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
            onChange={onChange}
            value={inputValues.sku}
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
            onChange={onChange}
            value={inputValues.name}
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
            onChange={onChange}
            value={inputValues.qty}
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
          onChange={onChange}
          value={inputValues.desc}
        />
      </Box>
    </Box>
  );
};

ProductFormTopSection.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputValues: PropTypes.shape({
    sku: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qty: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }),
};

export default React.memo(ProductFormTopSection);

/*
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
        sx={{ borderRadius: '6px', px: 5, ml: 'auto', display: 'table', mt: 5 }}
      >
        {buttonText}
      </Button>
    </form>  */

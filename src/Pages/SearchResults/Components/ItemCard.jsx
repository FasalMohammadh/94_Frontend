import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';

import PropTypes from 'prop-types';

import ArrowRight from './../../../Assets/Icons/arrow.svg';

const ItemCard = ({ productDetails }) => {
  return (
    <Box width='90%' mx='auto'>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        px={4}
        mb={2}
      >
        <Stack gap={1}>
          <Typography color='primary' fontWeight={500} variant='body2'>
            #{productDetails.sku}
          </Typography>
          <Typography color='text.primary' fontWeight={600}>
            {productDetails.name}
          </Typography>
          <Typography color='text.secondary' variant='caption'>
            {productDetails.description}
          </Typography>
        </Stack>

        <IconButton>
          <img src={ArrowRight} alt='More Info Icon' />
        </IconButton>
      </Stack>
      <Divider />
    </Box>
  );
};

ItemCard.propTypes = {
  productDetails: PropTypes.shape({
    sku: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemCard;

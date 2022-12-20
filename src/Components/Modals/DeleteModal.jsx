import React from 'react';

import { Button, Dialog, IconButton, Stack, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import AlertIcon from './../../Assets/Icons/alert.svg';

import { setProducts } from '../../Redux/Reducers/ProductsSlice';

import axios from '../../Utils/Axios';

const DeleteModal = ({ id, onClose, ...props }) => {
  const dispatch = useDispatch();

  const handleClickDelete = async () => {
    try {
      // api call to delete
      await axios.delete(`/products/${id}`);

      // api call to update product list
      const { data } = await axios.get('/products');
      dispatch(setProducts(data));

      onClose();
    } catch (error) {
      alert('Something Went Wrong');
    }
  };

  return (
    <Dialog
      onClose={onClose}
      PaperProps={{
        sx: theme => ({
          backgroundColor: theme.palette.light.main,
          borderRadius: '16px',
        }),
      }}
      {...props}
    >
      {/* close icon */}
      <IconButton
        onClick={onClose}
        aria-label='close modal'
        sx={{ marginLeft: 'auto', mr: 1, mt: 1 }}
      >
        <CloseIcon fontSize='small' sx={{ color: 'text.primary' }} />
      </IconButton>

      <Stack alignItems='center' padding='1em 3em 3em 3em' gap={2}>
        <img src={AlertIcon} alt='Alert Icon' style={{ width: '50px' }} />
        <Typography component='h1' variant='h6' fontWeight={600}>
          ARE YOU SURE?
        </Typography>
        <Typography component='span' fontWeight={600} mt={-1} mb={1}>
          You will not be able to undo this action if you proceed!
        </Typography>

        {/* action buttons container */}
        <Stack direction='row' gap={2}>
          <Button
            sx={{ flexBasis: '50%' }}
            onClick={onClose}
            variant='outlined'
            size='large'
          >
            Cancel
          </Button>
          <Button
            sx={{ flexBasis: '50%' }}
            onClick={handleClickDelete}
            size='large'
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

DeleteModal.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(DeleteModal);

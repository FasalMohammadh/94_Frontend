import { useState } from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import SearchIcon from '@mui/icons-material/Search';

import StarredIcon from './../Assets/Icons/starred.svg';
import { Link } from '@mui/material';

const SearchbarSection = () => {
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const handleClickSearch = async event => {
    event.preventDefault();
    if (searchText.length) navigate(`/search/${searchText}`);
  };

  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      {/* search bar section */}
      <form onSubmit={handleClickSearch} style={{ flexGrow: '.65' }}>
        <TextField
          fullWidth
          type='search'
          placeholder='Search for products'
          variant='outlined'
          onChange={event => setSearchText(event.target.value)}
          InputProps={{
            sx: theme => ({
              backgroundColor: theme.palette.light.main,
              borderRadius: 99,
              '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            }),
            endAdornment: (
              <InputAdornment position='end'>
                <Button
                  color='primary'
                  startIcon={<SearchIcon />}
                  sx={{ borderRadius: 99, px: 4 }}
                  type='submit'
                >
                  Search
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </form>

      {/* new product and fav product section */}
      <Stack direction='row' gap={2}>
        <Button
          LinkComponent={RouterLink}
          to='new-product'
          sx={{
            whiteSpace: 'nowrap',
            paddingInline: 6,
            borderRadius: '10px',
          }}
        >
          New Product
        </Button>

        <Link
          component={RouterLink}
          to='/favorite'
          display='flex'
          alignItems='center'
          justifyContent='center'
          sx={{ px: 1.5 }}
          border={theme => `1px solid ${theme.palette.primary.main}`}
          borderRadius={2}
        >
          <img src={StarredIcon} alt='Favorite Icon' />
        </Link>
      </Stack>
    </Stack>
  );
};

export default SearchbarSection;

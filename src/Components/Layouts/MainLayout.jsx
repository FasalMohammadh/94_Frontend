import React from 'react';

import { Outlet } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { ONLINE_STATUS } from '../../Constants/COLORS';

const MainLayout = () => {
  return (
    <Container>
      <AppBar
        color='transparent'
        elevation={0}
        position='static'
        sx={{ py: 2, mb: 4 }}
      >
        <Stack marginLeft='auto' direction='row' gap={2}>
          <Button
            endIcon={<ArrowDropDownIcon color='inherit' fontSize='large' />}
            variant='text'
            sx={theme => ({ color: theme.palette.text.primary })}
          >
            ADMIN
          </Button>

          <Badge
            sx={{ '& > 	.MuiBadge-badge': { bgcolor: ONLINE_STATUS } }}
            variant='dot'
            overlap='circular'
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box
              bgcolor={theme => theme.palette.primary.main}
              width='48px'
              sx={{ aspectRatio: '1', borderRadius: '99px' }}
            />
          </Badge>
        </Stack>
      </AppBar>

      <Outlet />
    </Container>
  );
};

export default React.memo(MainLayout);

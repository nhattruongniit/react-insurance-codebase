import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { FC } from 'react';

const LoadingTable: FC = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(255, 255, 255, .5)',
      zIndex: '501', // fixed column is 500
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress />
  </Box>
);

export default LoadingTable;

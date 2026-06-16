import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function HeaderComponents() {
  const { pathname } = useLocation();

  const navBtn = (label, to) => {
    const active = pathname === to || (to === '/employees' && pathname === '/');
    return (
      <Button
        key={to}
        component={Link}
        to={to}
        size="small"
        sx={{
          ml: 1,
          borderRadius: 0,
          fontSize: '0.7rem',
          letterSpacing: '1.5px',
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 600,
          color: active ? '#1A1A1A' : '#A8A8A8',
          bgcolor: active ? '#D97757' : 'transparent',
          px: 2,
          py: 0.75,
          border: active ? '1px solid #D97757' : '1px solid #3A3A3A',
          '&:hover': {
            bgcolor: active ? '#B85C35' : 'rgba(217,119,87,0.12)',
            color: active ? '#FFFFFF' : '#D97757',
            borderColor: '#D97757',
          },
        }}
      >
        {label}
      </Button>
    );
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <PeopleAltIcon sx={{ color: '#D97757', mr: 1.5, fontSize: 18 }} />
        <Typography
          variant="h6"
          component={Link}
          to="/employees"
          sx={{
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '1px',
            color: '#F5F4F2',
            textDecoration: 'none',
            flexGrow: 1,
          }}
        >
          EMP_MGMT
        </Typography>
        <Box>
          {navBtn('EMPLOYEES', '/employees')}
          {navBtn('DEPARTMENTS', '/departments')}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderComponents;

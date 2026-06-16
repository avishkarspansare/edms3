import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmployeeService from '../services/EmployeeService';

function ViewEmployeeComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    EmployeeService.getById(id).then(res => setEmployee(res.data));
  }, [id]);

  if (!employee) {
    return (
      <Box sx={{ maxWidth: 480, mx: 'auto', px: 3 }}>
        <Typography sx={{ color: '#C8C4BC', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.8rem', mt: 4 }}>
          LOADING...
        </Typography>
      </Box>
    );
  }

  const rows = [
    { label: 'EMPLOYEE ID', value: <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', color: '#D97757', fontSize: '0.9rem' }}>#{employee.id}</Typography> },
    { label: 'FIRST NAME',  value: employee.firstName },
    { label: 'LAST NAME',   value: employee.lastName },
    { label: 'EMAIL',       value: <Typography sx={{ color: '#6B7280', fontSize: '0.85rem' }}>{employee.emailId}</Typography> },
    {
      label: 'DEPARTMENT',
      value: employee.department
        ? <Chip label={employee.department.name} size="small" sx={{ bgcolor: 'rgba(217,119,87,0.10)', color: '#B85C35', border: '1px solid rgba(217,119,87,0.3)', borderRadius: 0, fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem' }} />
        : <Typography sx={{ color: '#C8C4BC', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.8rem' }}>—</Typography>,
    },
  ];

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', px: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#D97757', display: 'block', mb: 0.25 }}>
          RECORD DETAIL
        </Typography>
        <Typography variant="h4" sx={{ color: '#1A1A1A', fontSize: '1.4rem' }}>
          Employee Profile
        </Typography>
      </Box>

      <Box sx={{ border: '1px solid #1C1C28', bgcolor: '#FFFFFF' }}>
        {rows.map(({ label, value }, i) => (
          <Box
            key={label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 3,
              py: 1.75,
              borderBottom: i < rows.length - 1 ? '1px solid #EDE9E4' : 'none',
            }}
          >
            <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', letterSpacing: '2px', color: '#8A8A8A', width: 130, flexShrink: 0 }}>
              {label}
            </Typography>
            <Box sx={{ color: '#6B6B6B', fontSize: '0.875rem' }}>{value}</Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<EditOutlinedIcon sx={{ fontSize: '14px !important' }} />}
          onClick={() => navigate(`/update-employee/${id}`)}
        >
          EDIT
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ArrowBackIcon sx={{ fontSize: '14px !important' }} />}
          onClick={() => navigate('/employees')}
        >
          BACK
        </Button>
      </Box>
    </Box>
  );
}

export default ViewEmployeeComponent;

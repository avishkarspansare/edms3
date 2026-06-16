import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EmployeeService from '../services/EmployeeService';

function ListEmployeeComponents() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    EmployeeService.getAll().then(res => setEmployees(res.data));
  }, []);

  const deleteEmployee = (id) => {
    if (!window.confirm('Delete this employee?')) return;
    EmployeeService.remove(id).then(() =>
      setEmployees(prev => prev.filter(e => e.id !== id))
    );
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3 }}>
      {/* Header row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="overline" sx={{ color: '#D97757', display: 'block', mb: 0.25 }}>
            RECORDS
          </Typography>
          <Typography variant="h4" sx={{ color: '#1A1A1A', fontSize: '1.4rem' }}>
            Employees
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ fontSize: '14px !important' }} />}
          onClick={() => navigate('/add-employee')}
          sx={{ height: 36 }}
        >
          ADD
        </Button>
      </Box>

      {/* Table */}
      <Box sx={{ border: '1px solid #E0DDD8' }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {['ID', 'First Name', 'Last Name', 'Email', 'Department', 'Actions'].map(h => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center', py: 6, color: '#B8B4AE !important', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.8rem !important' }}>
                    NO RECORDS FOUND — ADD AN EMPLOYEE TO GET STARTED
                  </TableCell>
                </TableRow>
              ) : employees.map(emp => (
                <TableRow key={emp.id}>
                  <TableCell sx={{ color: '#D97757 !important', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.75rem !important' }}>
                    #{emp.id}
                  </TableCell>
                  <TableCell>{emp.firstName}</TableCell>
                  <TableCell>{emp.lastName}</TableCell>
                  <TableCell sx={{ color: '#6B6B6B !important', fontSize: '0.8rem !important' }}>{emp.emailId}</TableCell>
                  <TableCell>
                    {emp.department
                      ? <Chip label={emp.department.name} size="small" sx={{ bgcolor: 'rgba(217,119,87,0.10)', color: '#B85C35', border: '1px solid rgba(217,119,87,0.3)', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem' }} />
                      : <Typography sx={{ color: '#C8C4BC', fontSize: '0.75rem', fontFamily: '"JetBrains Mono", monospace' }}>—</Typography>
                    }
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                      <Button variant="outlined" size="small" color="primary" onClick={() => navigate(`/view-employee/${emp.id}`)} sx={{ minWidth: 0, px: 1, py: 0.25 }}>
                        <VisibilityOutlinedIcon sx={{ fontSize: 14 }} />
                      </Button>
                      <Button variant="outlined" size="small" color="success" onClick={() => navigate(`/update-employee/${emp.id}`)} sx={{ minWidth: 0, px: 1, py: 0.25 }}>
                        <EditOutlinedIcon sx={{ fontSize: 14 }} />
                      </Button>
                      <Button variant="outlined" size="small" color="error" onClick={() => deleteEmployee(emp.id)} sx={{ minWidth: 0, px: 1, py: 0.25 }}>
                        <DeleteOutlineIcon sx={{ fontSize: 14 }} />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Record count bar */}
        {employees.length > 0 && (
          <Box sx={{ borderTop: '1px solid #EDE9E4', px: 2, py: 0.75, bgcolor: '#F5F4F2' }}>
            <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: '#B8B4AE', letterSpacing: '1px' }}>
              {employees.length} RECORD{employees.length !== 1 ? 'S' : ''}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ListEmployeeComponents;

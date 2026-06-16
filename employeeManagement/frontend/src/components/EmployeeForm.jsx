import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import EmployeeService from '../services/EmployeeService';
import DepartmentService from '../services/DepartmentService';

function EmployeeForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ firstName: '', lastName: '', emailId: '', departmentId: '' });
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    DepartmentService.getAll().then(res => setDepartments(res.data)).catch(() => {});
    if (isEdit) {
      EmployeeService.getById(id).then(res => {
        const emp = res.data;
        setForm({
          firstName: emp.firstName || '',
          lastName: emp.lastName || '',
          emailId: emp.emailId || '',
          departmentId: emp.department ? String(emp.department.id) : '',
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      emailId: form.emailId.trim(),
      department: form.departmentId ? { id: Number(form.departmentId) } : null,
    };
    const req = isEdit ? EmployeeService.update(id, payload) : EmployeeService.create(payload);
    req.then(() => navigate('/employees'))
       .catch(err => setError(err.response?.data?.error || 'Failed to save employee.'));
  };

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName',  label: 'Last Name',  type: 'text' },
    { name: 'emailId',   label: 'Email',       type: 'email' },
  ];

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', px: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#D97757', display: 'block', mb: 0.25 }}>
          {isEdit ? 'MODIFY RECORD' : 'NEW RECORD'}
        </Typography>
        <Typography variant="h4" sx={{ color: '#1A1A1A', fontSize: '1.4rem' }}>
          {isEdit ? 'Edit Employee' : 'Add Employee'}
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ border: '1px solid #E0DDD8', p: 3, bgcolor: '#FFFFFF' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {fields.map(({ name, label, type }) => (
            <TextField
              key={name}
              name={name}
              label={label}
              type={type}
              value={form[name]}
              onChange={handleChange}
              required
              fullWidth
            />
          ))}

          <FormControl fullWidth size="small">
            <InputLabel sx={{ color: '#6B7280', fontSize: '0.8rem', '&.Mui-focused': { color: '#00D4FF' } }}>
              Department
            </InputLabel>
            <Select
              name="departmentId"
              value={form.departmentId}
              onChange={handleChange}
              label="Department"
            >
              <MenuItem value=""><em style={{ color: '#8A8A8A', fontSize: '0.85rem' }}>No Department (Bench)</em></MenuItem>
              {departments.map(dept => (
                <MenuItem key={dept.id} value={String(dept.id)}>{dept.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {error && <Alert severity="error" sx={{ borderRadius: 0 }}>{error}</Alert>}

          <Box sx={{ display: 'flex', gap: 1, pt: 0.5 }}>
            <Button type="submit" variant="contained" sx={{ flex: 1 }}>
              {isEdit ? 'UPDATE' : 'SAVE'}
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/employees')}
              sx={{ flex: 1 }}
            >
              CANCEL
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EmployeeForm;

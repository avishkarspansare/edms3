import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DepartmentService from '../services/DepartmentService';

function DepartmentComponent() {
  const [newName, setNewName] = useState('');
  const [addMsg, setAddMsg] = useState({ text: '', ok: true });

  const [searchName, setSearchName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [searchMsg, setSearchMsg] = useState('');
  const [empCount, setEmpCount] = useState(null);
  const [allDepts, setAllDepts] = useState([]);
  const suggestRef = useRef(null);

  useEffect(() => {
    DepartmentService.getAll().then(res => setAllDepts(res.data)).catch(() => { });
  }, []);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e) => { if (suggestRef.current && !suggestRef.current.contains(e.target)) setSuggestions([]); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) { setAddMsg({ text: 'Department name is required.', ok: false }); return; }
    try {
      const res = await DepartmentService.create({ name: trimmed });
      setAddMsg({ text: `Created: ${res.data.name} (id #${res.data.id})`, ok: true });
      setNewName('');
      setAllDepts(prev => [...prev, res.data]);
    } catch (err) {
      setAddMsg({ text: err.response?.data?.error || 'Error creating department.', ok: false });
    }
  };

  const runSearch = async (name) => {
    setSearchMsg(''); setSearchResult(null); setEmpCount(null); setSuggestions([]);
    try {
      const res = await DepartmentService.findByName(name);
      setSearchResult(res.data);
      const countRes = await DepartmentService.countEmployees(res.data.id);
      setEmpCount(countRes.data.employeeCount);
    } catch (err) {
      setSearchMsg(err.response?.status === 404 ? 'Department not found.' : 'Search failed.');
    }
  };

  const handleSearchInput = (e) => {
    const val = e.target.value;
    setSearchName(val);
    setSuggestions(val.trim() ? allDepts.filter(d => d.name.toLowerCase().includes(val.toLowerCase())) : []);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchName.trim();
    if (!trimmed) { setSearchMsg('Please enter a name to search.'); return; }
    runSearch(trimmed);
  };

  const sectionBox = { border: '1px solid #E0DDD8', bgcolor: '#FFFFFF', mb: 3 };
  const sectionHeader = {
    px: 2.5, py: 1.5, borderBottom: '1px solid #EDE9E4', bgcolor: '#F5F4F2',
    display: 'flex', alignItems: 'center', gap: 1,
  };

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto', px: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: '#D97757', display: 'block', mb: 0.25 }}>
          MANAGEMENT
        </Typography>
        <Typography variant="h4" sx={{ color: '#1A1A1A', fontSize: '1.4rem' }}>
          Departments
        </Typography>
      </Box>

      {/* ── Add Department ────────────────────────────── */}
      <Box sx={sectionBox}>
        <Box sx={sectionHeader}>
          <AddIcon sx={{ fontSize: 14, color: '#D97757' }} />
          <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', letterSpacing: '2px', color: '#8A8A8A' }}>
            ADD DEPARTMENT
          </Typography>
        </Box>
        <Box sx={{ p: 2.5 }}>
          <Box component="form" onSubmit={handleAdd} sx={{ display: 'flex', gap: 1 }}>
            <TextField
              placeholder="Department name"
              value={newName}
              onChange={e => { setNewName(e.target.value); setAddMsg({ text: '', ok: true }); }}
              fullWidth
              size="small"
            />
            <Button type="submit" variant="contained" sx={{ flexShrink: 0, px: 2.5 }}>ADD</Button>
          </Box>
          {addMsg.text && (
            <Alert severity={addMsg.ok ? 'success' : 'error'} sx={{ mt: 1.5, borderRadius: 0, py: 0.25, fontSize: '0.78rem' }}>
              {addMsg.text}
            </Alert>
          )}
        </Box>
      </Box>

      {/* ── Find Department ───────────────────────────── */}
      <Box sx={sectionBox}>
        <Box sx={sectionHeader}>
          <SearchIcon sx={{ fontSize: 14, color: '#D97757' }} />
          <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', letterSpacing: '2px', color: '#8A8A8A' }}>
            FIND DEPARTMENT
          </Typography>
        </Box>
        <Box sx={{ p: 2.5 }}>
          <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: 'flex', gap: 1, position: 'relative' }} ref={suggestRef}>
            <Box sx={{ flex: 1, position: 'relative' }}>
              <TextField
                placeholder="Search by name"
                value={searchName}
                onChange={handleSearchInput}
                fullWidth
                size="small"
                autoComplete="off"
              />
              {/* Suggestions dropdown */}
              {suggestions.length > 0 && (
                <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, border: '1px solid #E0DDD8', borderTop: 'none', bgcolor: '#FFFFFF', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  {suggestions.map(dept => (
                    <Box
                      key={dept.id}
                      onClick={() => { setSearchName(dept.name); runSearch(dept.name); }}
                      sx={{
                        px: 2, py: 1,
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        color: '#1A1A1A',
                        borderBottom: '1px solid #EDE9E4',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        '&:hover': { bgcolor: '#1C1C28', color: '#D97757' },
                        '&:last-child': { borderBottom: 'none' },
                      }}
                    >
                      <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', color: '#C8C4BC' }}>#{dept.id}</Typography>
                      {dept.name}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
            <Button type="submit" variant="outlined" color="primary" sx={{ flexShrink: 0, px: 2.5 }}>
              <SearchIcon sx={{ fontSize: 16 }} />
            </Button>
          </Box>

          {searchMsg && <Alert severity="error" sx={{ mt: 1.5, borderRadius: 0, py: 0.25, fontSize: '0.78rem' }}>{searchMsg}</Alert>}

          {/* Result */}
          {searchResult && (
            <Box sx={{ mt: 2, border: '1px solid #E0DDD8', borderLeft: '3px solid #D97757' }}>
              {[
                { label: 'ID', value: <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', color: '#D97757', fontSize: '0.85rem' }}>#{searchResult.id}</Typography> },
                { label: 'NAME', value: searchResult.name },
                { label: 'EMPLOYEES', value: empCount !== null ? <Chip label={`${empCount} members`} size="small" sx={{ bgcolor: 'rgba(46,125,94,0.08)', color: '#2E7D5E', border: '1px solid rgba(46,125,94,0.25)', borderRadius: 0, fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem' }} /> : '—' },
              ].map(({ label, value }, i, arr) => (
                <Box key={label} sx={{ display: 'flex', alignItems: 'center', px: 2.5, py: 1.5, borderBottom: i < arr.length - 1 ? '1px solid #EDE9E4' : 'none' }}>
                  <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', letterSpacing: '2px', color: '#8A8A8A', width: 110, flexShrink: 0 }}>
                    {label}
                  </Typography>
                  <Box sx={{ color: '#1A1A1A', fontSize: '0.875rem' }}>{value}</Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* ── List Departments ─────────────────────────── */}
      <Box sx={sectionBox}>
        <Box sx={sectionHeader}>
          <SearchIcon sx={{ fontSize: 14, color: '#D97757' }} />
          <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', letterSpacing: '2px', color: '#8A8A8A' }}>
            LIST DEPARTMENTS
          </Typography>
        </Box>
        <Box sx={{ p: 2.5 }}>
          {allDepts.length === 0 ? (
            <Alert severity="info" sx={{ borderRadius: 0, py: 0.75, fontSize: '0.78rem' }}>
              No departments available yet.
            </Alert>
          ) : (
            <Box sx={{ display: 'grid', gap: 1 }}>
              {allDepts.map((dept) => (
                <Box
                  key={dept.id}
                  onClick={() => runSearch(dept.name)}
                  sx={{
                    border: '1px solid #E0DDD8',
                    borderRadius: 0,
                    p: 1.5,
                    cursor: 'pointer',
                    transition: 'background 0.18s ease',
                    '&:hover': { bgcolor: '#FBF7F3' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                    <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', letterSpacing: '2px', color: '#8A8A8A', flexShrink: 0, width: 110 }}>
                      ID
                    </Typography>
                    <Typography sx={{ color: '#D97757', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.85rem' }}>#{dept.id}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', letterSpacing: '2px', color: '#8A8A8A', flexShrink: 0, width: 110 }}>
                      NAME
                    </Typography>
                    <Typography sx={{ color: '#1A1A1A', fontSize: '0.95rem' }}>{dept.name}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default DepartmentComponent;

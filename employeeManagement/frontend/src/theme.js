import { createTheme } from '@mui/material/styles';

// Claude orange: #D97757  |  accent dark: #B85C35
// Palette: warm white surfaces, charcoal text, orange primary, slate borders

const theme = createTheme({
  shape: { borderRadius: 0 },
  palette: {
    mode: 'light',
    background: {
      default: '#F5F4F2',   // warm off-white — not blinding white
      paper: '#FFFFFF',
    },
    primary: {
      main: '#D97757',   // Claude orange
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#B85C35',           // darker orange for hover/secondary actions
    },
    error: {
      main: '#D94F4F',
    },
    success: {
      main: '#2E7D5E',
    },
    info: {
      main: '#2C6FAC',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#6B6B6B',
    },
    divider: '#E0DDD8',
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    h4: {
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h6: {
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      fontWeight: 600,
    },
    overline: {
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      fontSize: '0.65rem',
      letterSpacing: '2px',
    },
    button: {
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      fontWeight: 600,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      fontSize: '0.72rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #F5F4F2; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F5F4F2; }
        ::-webkit-scrollbar-thumb { background: #D97757; }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '6px 16px',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          background: '#D97757',
          color: '#FFFFFF',
          '&:hover': { background: '#B85C35' },
        },
        outlinedPrimary: {
          borderColor: '#D97757',
          color: '#D97757',
          '&:hover': { background: 'rgba(217,119,87,0.06)', borderColor: '#B85C35' },
        },
        outlinedError: {
          borderColor: '#D94F4F',
          color: '#D94F4F',
          '&:hover': { background: 'rgba(217,79,79,0.06)' },
        },
        outlinedSuccess: {
          borderColor: '#2E7D5E',
          color: '#2E7D5E',
          '&:hover': { background: 'rgba(46,125,94,0.06)' },
        },
        outlinedInfo: {
          borderColor: '#2C6FAC',
          color: '#2C6FAC',
          '&:hover': { background: 'rgba(44,111,172,0.06)' },
        },
        outlinedSecondary: {
          borderColor: '#C8C4BC',
          color: '#6B6B6B',
          '&:hover': { background: 'rgba(0,0,0,0.03)', borderColor: '#A8A49C' },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'small' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            background: '#FAFAF9',
            fontFamily: '"Inter", sans-serif',
            '& fieldset': { borderColor: '#D8D4CE' },
            '&:hover fieldset': { borderColor: '#B8B4AE' },
            '&.Mui-focused fieldset': { borderColor: '#D97757', borderWidth: '1.5px' },
          },
          '& .MuiInputLabel-root': { color: '#8A8A8A', fontSize: '0.8rem' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#D97757' },
          '& .MuiInputBase-input': { color: '#1A1A1A', fontSize: '0.875rem' },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          background: '#FAFAF9',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#D8D4CE' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#B8B4AE' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#D97757', borderWidth: '1.5px' },
          '& .MuiSelect-select': { color: '#1A1A1A', fontSize: '0.875rem' },
        },
        icon: { color: '#8A8A8A' },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: { background: '#FFFFFF', borderRadius: 0, border: '1px solid #E0DDD8', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          color: '#1A1A1A',
          '&:hover': { background: '#FFF3EF' },
          '&.Mui-selected': { background: '#FFF3EF', color: '#D97757' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          border: '1px solid #E0DDD8',
          borderRadius: 0,
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none', borderRadius: 0 },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& th': {
            background: '#F0EDE8',
            color: '#8A8A8A',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            borderBottom: '2px solid #D97757',  // orange bottom line on thead
            padding: '12px 16px',
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& tr': {
            borderLeft: '3px solid transparent',
            transition: 'border-color 0.15s, background 0.15s',
            '&:hover': {
              background: '#FFF8F5',
              borderLeft: '3px solid #D97757',
            },
          },
          '& td': {
            borderBottom: '1px solid #EDE9E4',
            color: '#2A2A2A',
            fontSize: '0.875rem',
            padding: '10px 16px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: '#EDE9E4' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 0, fontSize: '0.72rem', height: '22px' },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 0, fontSize: '0.8rem' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: '0.8rem' },
      },
    },
    MuiFormControl: {
      defaultProps: { size: 'small' },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#E0DDD8' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#1A1A1A',       // dark navbar — contrast against bright body
          borderBottom: '3px solid #D97757',
          boxShadow: 'none',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: { minHeight: '52px !important', padding: '0 24px !important' },
      },
    },
  },
});

export default theme;
import './App.css';
import { useState } from 'react';
import { CssBaseline } from '@mui/material';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Layout } from './Layout/Layout';
import { customizations } from './Theme';

const App = () => {
  // For toggling theme (Dark || Light)
  const [mode, setMode] = useState('light');

  // Custom theme template
  const theme = createTheme(customizations(mode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Paper
        style={{ borderRadius: '0', minHeight: '100vh', minWidth: '100vw' }}
        elevation={0}
      >
        {/* Layout of the App */}
        <Layout mode={mode} setMode={setMode} />
      </Paper>
    </ThemeProvider>
  );
};

export default App;

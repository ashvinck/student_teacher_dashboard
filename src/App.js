import './App.css';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline, responsiveFontSizes, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { customizations } from './Theme';
import { selectTheme } from './Features/Theme/themeSlice';
import Home from './Pages/Home';
import NotFound404 from './Pages/NotFound404';
import { LayoutContainer } from './Components/Layouts/LayoutContainer';
import AuthRoutes from './Routes/AuthRoutes';

const App = () => {
  // For toggling theme (Dark || Light)
  const [mode, setMode] = useState('light');
  const darkMode = useSelector(selectTheme);

  const memoizedDarkMode = useMemo(() => darkMode, [darkMode]);

  useEffect(() => {
    memoizedDarkMode ? setMode('dark') : setMode('light');
  }, [memoizedDarkMode]);

  // Custom theme template
  let theme = createTheme(customizations(mode));
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Paper
        style={{ borderRadius: '0', minHeight: '100vh', minWidth: '100vw' }}
        elevation={0}
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/*' element={<AuthRoutes />} />
          <Route path='/dashboard/*' element={<LayoutContainer />} />
          <Route path='/404' element={<NotFound404 />} />
          <Route path='*' element={<Navigate replace to='/404' />} />
        </Routes>
      </Paper>
    </ThemeProvider>
  );
};

export default App;

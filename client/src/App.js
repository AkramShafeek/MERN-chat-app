import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const uiMode = useSelector((store) => store.ui.mode);
  const themeType = useSelector((store) => store.ui.theme);
  const theme = useMemo(() => createTheme(themeSettings[themeType](uiMode)), [uiMode, themeType]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
      </ThemeProvider>
      {/* <button onClick={()=>setMode(mode === 'dark' ? 'light' : 'dark')}>toggle dark mode</button> */}
    </BrowserRouter>
  );
}

export default App;

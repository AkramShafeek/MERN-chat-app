import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { useMemo, useState } from 'react';

function App() {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
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

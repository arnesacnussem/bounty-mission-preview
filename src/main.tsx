import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { mainColor } from './consts.ts';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: mainColor,
        },
        success: {
            main: mainColor,
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'outlined',
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
);

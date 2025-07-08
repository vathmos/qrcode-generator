import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './output.css';
import App from './App.tsx'
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <ThemeProvider  attribute="class" defaultTheme="blurple-dark">
        <App />
      </ThemeProvider>
    </HeroUIProvider>
  </StrictMode>,
)

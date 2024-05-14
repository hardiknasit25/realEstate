import './App.css';
import React from 'react'
import Header from './components/Header/Header';
import { Outlet } from "react-router-dom";
import SigninContextProvider from './contexts/SignIn/SigninContextProvider';
import Footer from './components/Footer/Footer';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';


const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <SigninContextProvider>
        <Header />
        <Outlet />
        <Footer />
      </SigninContextProvider>
    </MantineProvider>
  );
}

export default App;

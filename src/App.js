import React from 'react';
import ResponsiveDrawer from './components/Navbar';
import { CssBaseline } from '@material-ui/core';
const App = () => {
  return (
    <div>
      <ResponsiveDrawer />
      <CssBaseline />
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { Button } from '@mui/material';
import ModalPopup from './ModalPopup';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>Open Modal</Button>
      <ModalPopup isOpen={isOpen} handleClose={handleClose} />
    </div>
  );
};

export default App;

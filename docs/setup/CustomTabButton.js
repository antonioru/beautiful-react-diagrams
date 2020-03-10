import React from 'react';
import Button from 'beautiful-react-ui/dist/components/Elements/Button';

const CustomTabButton = ({ active, children, onClick, ...props }) => {
  const isCodeBtn = (children === 'View Code');
  const icon = active ? 'minus' : 'plus';
  const color = isCodeBtn ? 'primary' : 'info';
  
  return (
    <Button outline color={color} icon={icon} onClick={onClick} style={{ margin: '1.2rem auto 1.2rem 0' }}>
      {isCodeBtn ? (active ? 'Hide code' : 'Show code') : children}
    </Button>
  );
};

export default CustomTabButton;

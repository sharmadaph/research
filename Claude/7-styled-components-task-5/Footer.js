import React from 'react';
import styled from 'styled-components';
import SecondaryButton from './Button';

const FooterContainer = styled.footer`
  background-color: #f9f9f9;
  border-top: 1px solid #e0e0e0;
  padding: 30px 20px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <SecondaryButton inFooter>My Friends</SecondaryButton>
    </FooterContainer>
  );
};

export default Footer;

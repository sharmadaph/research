import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
`;

const SecondaryButton = styled.button`
  background-color: transparent;
  color: #0095ee;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <SecondaryButton>My Friends</SecondaryButton>
    </FooterContainer>
  );
};

export default Footer;
import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const FooterWrap = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #f7fbff;
  border-top: 1px solid #e6f0fb;
`;

export default function Footer() {
  return (
    <FooterWrap>
      <div>© 2026 Your App</div>
      <Button variant="secondary">My Friends</Button>
    </FooterWrap>
  );
}

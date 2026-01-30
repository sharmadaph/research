import styled from 'styled-components';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform .08s ease, box-shadow .12s ease, background-color .12s ease;

  /* default (primary) look */
  background-color: #0095ee;
  color: #ffffff;
  border: none;

  /* Footer / secondary variant */
  ${(p) =>
    p.variant === 'secondary' &&
    `
    background-color: transparent;
    color: #0095ee;
    border: 1px solid rgba(0,149,238,0.16);
    box-shadow: none;
  `}

  &:hover {
    transform: translateY(-2px);
    ${(p) =>
      p.variant === 'secondary'
        ? 'background-color: rgba(0,149,238,0.04);'
        : 'box-shadow: 0 8px 24px rgba(0,149,238,0.18);'}
  }
`;

export default Button;

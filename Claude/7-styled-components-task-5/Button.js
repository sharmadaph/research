import styled from 'styled-components';

const SecondaryButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f0f0f0;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    transform: scale(0.98);
  }

  /* Apply Footer-specific styles when rendered in Footer context */
  ${props => props.inFooter && `
    background-color: transparent;
    color: #0095ee;
    border: 1px solid #0095ee;

    &:hover {
      background-color: rgba(0, 149, 238, 0.1);
      border-color: #0095ee;
    }

    &:active {
      background-color: rgba(0, 149, 238, 0.2);
    }
  `}
`;

export default SecondaryButton;

import styled from 'styled-components';

export const TabsArea = styled.div`
  display: flex;
  background-color: #5185ba;
  box-shadow: 0 2px 4px 0 rgba(81, 133, 186, 0.38);
  box-sizing: border-box;
`;

export const Tab = styled.div`
  width: 80px;
  text-align: center;
  padding-bottom: 8px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  border-bottom: ${(props) => (props.active && '2px solid #ffffff')};
`;

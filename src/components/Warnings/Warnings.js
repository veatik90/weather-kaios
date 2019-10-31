import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon/Icon';

const warning = ({ children }) => (
  <>
    <IconWrapper>
      <Icon type="big-partly-cloudy-day" />
    </IconWrapper>
    <Status>{children}</Status>
  </>
);

export default warning;

const IconWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 41px;
  margin: auto;
  width: 52px;
  height: 52px;
`;

const Status = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 110px;
  margin: auto;
  font-size: 12px;
  text-align: center;
  color: #797e83;
  white-space: pre-wrap;
`;

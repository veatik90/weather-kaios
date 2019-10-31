/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import styled from 'styled-components';


class softkey extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (evt) => {
    const {
      onKeyLeft,
      // eslint-disable-next-line react/prop-types
      onKeyCenter,
      onKeyRight,
      onKeyDown,
      onKeyUp,
      onSoftKeyLeft,
      onSoftKeyRight,
    } = this.props;


    switch (evt.key) {
      case 'ArrowLeft':
        return onKeyLeft && onKeyLeft(evt);
      case 'Enter':
        return onKeyCenter && onKeyCenter(evt);
      case 'ArrowRight':
        return onKeyRight && onKeyRight(evt);
      case 'ArrowDown':
        return onKeyDown && onKeyDown(evt);
      case 'ArrowUp':
        return onKeyUp && onKeyUp(evt);
      case 'SoftLeft':
        return onSoftKeyLeft && onSoftKeyLeft(evt);
      case 'SoftRight':
        return onSoftKeyRight && onSoftKeyRight(evt);
      default:
        return null;
    }
  };

  render() {
    const {
      left,
      center,
      right,
    } = this.props;
    return (
      <KeysWrapper>
        <label className="left">{left}</label>
        <label className="center">{center}</label>
        <label className="right">{right}</label>
      </KeysWrapper>
    );
  }
}

export default softkey;

const KeysWrapper = styled.div`
  height: 26px;
  max-height: 26px;
  width: 100%;
  max-width: 100%;
  background: #000000;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  white-space: nowrap;
  padding: 0 5px;
  font-weight: 700;
  box-sizing: border-box;
  line-height: 18px;
  margin-top: auto;
  bottom: 0;

  & .left,
  & .right {
    font-weight: 600;
    font-size: 14px;
    color: #f6f9ff;
    overflow: hidden;
    width: 100%;
    letter-spacing: -0.5px;
    box-sizing: border-box;
    text-overflow: ellipsis;
  }

  &  .left {
    text-align: left;
    padding-right: 10px;
  }

  & .center {
    color: #242424;
    text-transform: uppercase;
    font-size: 18px;
    text-align: center;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  & .right {
    text-align: right;
    padding-left: 10px;
  }
`;

import React from 'react';
import styled from 'styled-components';

const weatherDiagram = ({coords, temps}) => {
  const emptyTemp = <Temp></Temp>;
  return (
    <>
    <DiagramWrapper>
      <Diagram diff={coords.night || 0}>Night</Diagram>
      <Diagram diff={coords.morning || 0}>Morning</Diagram>
      <Diagram diff={coords.afternoon || 0}>Afternoon</Diagram>
      <Diagram diff={coords.evening || 0}>Evening</Diagram>
    </DiagramWrapper>
    <Temps>
      { isFinite(temps.night) ? <Temp bottom={coords.night + 3}>{temps.night}&deg;</Temp> : emptyTemp}
      { isFinite(temps.morning) ? <Temp bottom={coords.morning + 3}>{temps.morning}&deg;</Temp> : emptyTemp}
      { isFinite(temps.afternoon) ? <Temp bottom={coords.afternoon + 3}>{temps.afternoon}&deg;</Temp> : emptyTemp}
      { isFinite(temps.evening) ? <Temp bottom={coords.evening + 3}>{temps.evening}&deg;</Temp> : emptyTemp}
    </Temps>
    </>
  );
};

export default weatherDiagram;

const DiagramWrapper = styled.div`
  width: 240px;
  position: absolute;
  bottom: 0px;
  display: flex;
  align-items: flex-end;
`;


const Diagram = styled.div`
  width: 60px;
  height: ${props => (props.diff ? props.diff+'px' : '25px')};
  border-radius: 2px;
  border: solid 1px #ffffff;
  background-color: rgba(121, 126, 131, 0.11);
  font-size: 12px;
  color: #797e83;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
`;

const Temps = styled.div`
  width: 240px;
  position: absolute;
  bottom: 0px;
  display: flex;
  align-items: flex-end;
`;
const Temp = styled.div`
  display: flex;
  justify-content: center;
  width: 60px;
  font-size: 14px;
  color: #1e1d20;
  padding-bottom: ${props => (props.bottom && `${props.bottom}px`)};
  align-items: flex-end;
`;


import styled from "styled-components";

export const Container = styled.div`
background-color: black;
height: 100vh;
width: 100vw;
`;


export const Container3 = styled.div`
display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: black;

`;


export const Box1 = styled.div`
  position: fixed;
  top: 56%;
  left: 1%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 200px;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  border-style: solid;
  border-color: white;
  background-color: #acacac;
`;

export const Box2 = styled.div`
  position: fixed;
  top: 44%;
  left: 1%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 200px;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  border-style: solid;
  border-color: white;
  background-color: grey;
`;

export const Box3 = styled.div`
  background-color: #acacac;
  border: 1px solid white;
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 25%;
  left: 15%;
  width: 70vw;
  overflow: auto;
  max-height: 600px;
`;


export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  font-weight: 50px;
`;

export const TableData = styled.td`
  text-align: left;
  padding: 12px;
`;



import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 10px;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
`;

export const Box = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
`;

export const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
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
`;

export const TableData = styled.td`
  text-align: left;
  padding: 12px;
`;

export const TweetLink = styled.a`
  text-decoration: none;
  color: #4caf50;
  &:hover {
    text-decoration: underline;
  }
`;

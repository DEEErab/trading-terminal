import React, { useState } from 'react';
import {
  Container,
  Container3,
  Box1,
  Box2,
  Box3,
  Table,
  TableRow,
  TableHeader,
  TableData,
} from "./tradingElements.js";



const Trading = () => {

  const handleLinkClick = () => {
    // Perform any action you want when the box is clicked
    console.log('Dashboard clicked');
  };

  //const TableWithSorting = () => {
    const [data, setData] = useState([
    { acc: 1, token: 'John', time: 130, weight: '52' },
    { acc: 1, token: 'John', time: 320, weight: '5' },
    { acc: 1, token: 'John', time: 310, weight: '25' },
    { acc: 1, token: 'John', time: 330, weight: '5' },
    { acc: 1, token: 'John', time: 340, weight: '35' },
    { acc: 1, token: 'John', time: 10, weight: '5' },
    { acc: 1, token: 'John', time: 20, weight: '5' },
    { acc: 1, token: 'John', time: 10, weight: '45' },
    { acc: 1, token: 'John', time: 30, weight: '5' },
    { acc: 1, token: 'John', time: 30, weight: '65' },
    { acc: 1, token: 'John', time: 30, weight: '5' },
    { acc: 1, token: 'John', time: 30, weight: '5' },
    { acc: 1, token: 'John', time: 30, weight: '15' },
    { acc: 1, token: 'John', time: 30, weight: '5' }

  ]);

  const handleSort = (key) => {
    const sortedData = [...data].sort((a, b) => a[key] - b[key]);
    setData(sortedData);
  };

  return (
    <Container>
      <a href='http://localhost:3000/dashboard' onClick={handleLinkClick}>
      <Box1>
        <h2>Dashboard</h2>
      </Box1>
      </a>
      <a href='http://localhost:3000/trading' onClick={handleLinkClick}>
      <Box2>
        <h2>Trading</h2>
      </Box2>
      </a>
      <Container3>
      <Box3>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Account</TableHeader>
              <TableHeader>Token</TableHeader>
              <TableHeader onClick={() => handleSort('time')}>Time</TableHeader>
              <TableHeader onClick={() => handleSort('weight')}>Weight</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {data.map(item => (
              <TableRow key={item.acc}>
              
              <TableData>{item.acc}</TableData>
              <TableData>{item.token}</TableData>
              <TableData>{item.time}</TableData>
              <TableData>{item.weight}</TableData>

              </TableRow>
            ))}
          </tbody>
        </Table>
      </Box3>
      </Container3>
    </Container>
  );
};



export default Trading;

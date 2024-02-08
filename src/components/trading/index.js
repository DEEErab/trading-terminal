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


const OriginalTable = ({ onDataClick }) => {
  const handleSort = (key) => {
    const sortedData = [...data].sort((b, a) => a[key] - b[key]);
    setData(sortedData);
  };

    const handleSortTime = (key) => {
      const sortedData = [...data].sort((a, b) => a[key] - b[key]);
      setData(sortedData);
  };
  const [data, setData] = useState([
    { acc: 1, token: 'GME', time: 130, weight: '52' },
    { acc: 1, token: 'BTC', time: 320, weight: '5' },
    { acc: 1, token: 'LTC', time: 310, weight: '25' },
    { acc: 1, token: 'ETH', time: 330, weight: '5' },
    { acc: 1, token: 'SOL', time: 340, weight: '35' },
    { acc: 1, token: 'SFM', time: 10, weight: '5' },
    { acc: 1, token: 'DOGE', time: 20, weight: '5' },
    { acc: 1, token: 'WEN', time: 10, weight: '45' },
    { acc: 1, token: 'DEGEN', time: 30, weight: '5' },
    { acc: 1, token: 'MEME', time: 30, weight: '65' },
    { acc: 1, token: 'LORD', time: 30, weight: '5' },
    { acc: 1, token: 'SWAG', time: 30, weight: '5' },
    { acc: 1, token: 'PEPE', time: 30, weight: '15' },
    { acc: 1, token: 'SHIB', time: 30, weight: '5' }

  ]);
    return(
    <Table>
    <thead>
      <TableRow>
        <TableHeader>Account</TableHeader>
        <TableHeader>Token</TableHeader>
        <TableHeader onClick={() => handleSortTime('time')}>Time</TableHeader>
        <TableHeader onClick={() => handleSort('weight')}>Weight</TableHeader>
      </TableRow>
    </thead>
    <tbody>
      {data.map(item => (
        <TableRow key={item.acc} onClick={() => onDataClick(item)}>
        
        <TableData>{item.acc}</TableData>
        <TableData>{item.token}</TableData>
        <TableData>{item.time}</TableData>
        <TableData>{item.weight}</TableData>

        </TableRow>
      ))}
    </tbody>
  </Table>
    )
};

const NewTable = ({ data, onClose }) => {
  const [data1, setData] = useState([
    { CA: 1, Age: '5min', Volume: 30, Liquidity: '5', MCap: '500' },
    { CA: 1, Age: '7min', Volume: 30, Liquidity: '5', MCap: '500' },
    { CA: 1, Age: '20min', Volume: 30, Liquidity: '5', MCap: '500' },
    { CA: 1, Age: '1hr', Volume: 30, Liquidity: '5', MCap: '500' }

  ]);
    return(
      <div> 
        <button onClick={onClose}>X</button>
    <Table>
    <thead>
      <TableRow>
        <TableHeader>CA</TableHeader>
        <TableHeader>Age</TableHeader>
        <TableHeader>Volume</TableHeader>
        <TableHeader>Liquidity</TableHeader>
        <TableHeader>MCap</TableHeader>
      </TableRow>
    </thead>
    <tbody>
      {data1.map(item => (
        <TableRow key={item.acc}>
        
        <TableData>{item.CA}</TableData>
        <TableData>{item.Age}</TableData>
        <TableData>{item.Volume}</TableData>
        <TableData>{item.Liquidity}</TableData>
        <TableData>{item.MCap}</TableData>

        </TableRow>
      ))}
    </tbody>
  </Table>
  
  </div>
    )
};

const Trading = () => {
  const [showOriginalTable, setShowOriginalTable] = useState(true);
  const [newTableData, setNewTableData] = useState([]);
  const handleLinkClick = () => {
    // Perform any action you want when the box is clicked
    console.log('Dashboard clicked');
  };

  const handleDataClick = (rowData) => {
    // Generate new table data based on the clicked row
    const newTableData = [
      { column1: rowData.id, column2: rowData.name, column3: rowData.age, column4: 'Data 4', column5: 'Data 5' },
      // Add more rows as needed
    ];
    setNewTableData(newTableData);
    setShowOriginalTable(false);
  };

  const handleCloseNewTable = () => {
    setShowOriginalTable(true);
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
      {showOriginalTable ? (
        <OriginalTable onDataClick={handleDataClick} />
      ) : (
        <NewTable data={newTableData} onClose={handleCloseNewTable} />
      )}
      </Box3>
      </Container3>
    </Container>
  );
};



export default Trading;

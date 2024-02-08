import React from "react";
import {
  Container,
  Container2,
  Container3,
  Box,
  Box1,
  Box2,
  Box3,
  Box4,
  Button,
  Table,
  TableRow,
  TableHeader,
  TableData,
  TweetLink,
} from "./dashboardElements.js";



const Dashboard = () => {

  const handleLinkClick = () => {
    // Perform any action you want when the box is clicked
    console.log('Dashboard clicked');
  };

  const data = [
    { acc: 1, tweet: 'John', time: 30 },
    { acc: 2, tweet: 'Jane', time: 25 },
    { acc: 3, tweet: 'Doe', time: 35 },
    { acc: 4, tweet: 'John', time: 30 },
    { acc: 5, tweet: 'Jane', time: 25 },
    { acc: 6, tweet: 'Doe', time: 35 },
    { acc: 4, tweet: 'John', time: 30 },
    { acc: 5, tweet: 'Jane', time: 25 },
    { acc: 6, tweet: 'Doe', time: 35 }
  ];

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
      <Container2>
      <Box>
        <h2>PAIR</h2>
        <p>GME/SOL</p>
      </Box>
      <Box>
        <h2>Liquidity</h2>
        <p>$420k</p>
      </Box>
      <Box>
        <h2>Volume</h2>
        <p>$4.2M</p>
      </Box>
      <Box>
        <h2>MCap</h2>
        <p>$23m</p>
      </Box>
      </Container2>
      <Container3>
      <Box3>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Account</TableHeader>
              <TableHeader>Tweet</TableHeader>
              <TableHeader>Time</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {data.map(item => (
              <TableRow key={item.acc}>
              
              <TableData>{item.acc}</TableData>
              <TableData>{item.tweet}</TableData>
              <TableData>{item.time}</TableData>

              </TableRow>
            ))}
          </tbody>
        </Table>
      </Box3>
      <Box4>
      <h2>BUY</h2>
      </Box4>
      </Container3>
    </Container>
  );
};



export default Dashboard;


         {/* <tbody>
            <TableRow>
              <TableData>
                <TweetLink href="link">0xretard</TweetLink>
              </TableData>
              <TableData>
                <TweetLink href="link">link</TweetLink>
              </TableData>
              <TableData>4:20</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <TweetLink href="link">0xretard</TweetLink>
              </TableData>
              <TableData>
                <TweetLink href="link">link</TweetLink>
              </TableData>
              <TableData>4:20</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <TweetLink href="link">0xretard</TweetLink>
              </TableData>
              <TableData>
                <TweetLink href="link">link</TweetLink>
              </TableData>
              <TableData>4:20</TableData>
            </TableRow>
          </tbody> */}
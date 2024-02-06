import React from "react";
import {
  Container,
  Box,
  Button,
  Table,
  TableRow,
  TableHeader,
  TableData,
  TweetLink,
} from "./dashboardElements.js";

const Dashboard = () => {
  return (
    <Container>
      <Box>
        <h2>Dashboard</h2>
        <Button>Trading</Button>
      </Box>
      <Box>
        <h2>Trading</h2>
        <Button>Pair</Button>
      </Box>
      <Box>
        <h2>GME/SOL</h2>
        <p>MCap: $23m</p>
      </Box>
      <Box>
        <h2>GME/SOL</h2>
        <p>MCap: $23m</p>
      </Box>
      <Box>
        <h2>GME/SOL</h2>
        <p>MCap: $23m</p>
      </Box>
      <Box>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Account</TableHeader>
              <TableHeader>Tweet</TableHeader>
              <TableHeader>Time</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            <TableRow>
              <TableData>
                <TweetLink href="link">link</TweetLink>
              </TableData>
              <TableData>
                <TweetLink href="link">link</TweetLink>
              </TableData>
              <TableData>4:20</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <TweetLink href="link">link</TweetLink>
              </TableData>
              <TableData>
                <TweetLink href="link">link</TweetLink>
              </TableData>
              <TableData>4:20</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <TweetLink href="link">link</TweetLink>
              </TableData>
              <TableData>
                <TweetLink href="link">link</TweetLink>
              </TableData>
              <TableData>4:20</TableData>
            </TableRow>
          </tbody>
        </Table>
      </Box>
    </Container>
  );
};

export default Dashboard;

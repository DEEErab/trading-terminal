import React, { useEffect, useState } from "react";
import {
  Container,
  Container2,
  Container3,
  Container4,
  Dexscreener,
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
import axios from "axios";

const API_URL = "http://localhost:8080/";
const DEX_SCREENER_URL = "https://api.dexscreener.com/latest/dex/search?q="

const Dashboard = () => {

  const [tweets, setTweets] = useState([]);

  // Get the URL parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the 'pairAddress' parameter
const pairAddress = urlParams.get('pairAddress');


const [newPairAddress, newToken] = pairAddress.split(/\/token=(?=\$?)/);

const [token, chainId] = newToken.split("/chainId=");

console.log("Pair Address:", newPairAddress);
console.log("Token:", token);
console.log("Chain:", chainId);


const url = `https://dexscreener.com/${chainId}/${newPairAddress}`;




  const handleLinkClick = () => {
    // Perform any action you want when the box is clicked
    console.log('Dashboard clicked');
  };

  const getTweetsTokenByData = async (token) => {
     const tokenL = token.toLowerCase();
     const tweets = await axios.post(API_URL + "tweetsbytoken", {
      token: tokenL
     })

     console.log(tweets.data)
     setTweets(tweets.data);
  }


  useEffect( () => {
   getTweetsTokenByData(token);

  }, [token])
  

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
      {/* <Container2>
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
      </Container2> */}
      <Container4>
        <Dexscreener>
        <iframe src={url} width="1500" height="640" frameborder="0"></iframe>
        </Dexscreener>
      </Container4>
      
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
  {tweets.map(item => {
    const tweetTime = new Date(item.tweetTime);
    const diffInMilliseconds = Date.now() - tweetTime.getTime();
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    return (
      <TableRow key={item.acc}>
        <TableData>{item.tweetWho}</TableData>
        <TableData>{item.tweetString}</TableData>
        <TableData>{`${diffInHours} hrs ago`}</TableData>
      </TableRow>
    );
  })}
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
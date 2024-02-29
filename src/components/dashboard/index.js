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

const API_URL = "https://c5cf-75-18-109-104.ngrok-free.app/";
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
  }, {
      headers: {
          'ngrok-skip-browser-warning': 'true'
      }
  });

     console.log(tweets.data)
     setTweets(tweets.data);
  }


  useEffect( () => {
   getTweetsTokenByData(token);

  }, [token])

  const sortedTweets = tweets.sort((a, b) => {
    const timeA = new Date(a.tweetTime);
    const timeB = new Date(b.tweetTime);
    return timeB - timeA;
  });
  

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
          {sortedTweets.map(item => {
  const tweetTime = new Date(item.tweetTime);
  const currentTime = new Date();
  const month = tweetTime.getMonth() + 1;
  const day = tweetTime.getDate();
  const hours = tweetTime.getHours();
  const minutes = tweetTime.getMinutes();
  const formattedTime = `${month}/${day} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  const diffMs = currentTime - tweetTime;
  const diffMins = Math.round(diffMs / 60000); // Convert difference to minutes
  const daysAgo = Math.floor(diffMins / (60 * 24));
  const hoursAgo = Math.floor((diffMins % (60 * 24)) / 60);
  const minutesAgo = diffMins % 60;
  const daysString = daysAgo > 0 ? `${daysAgo}d ` : '';
  const hoursString = hoursAgo > 0 ? `${hoursAgo}hr ` : '';
  const minutesString = minutesAgo > 0 ? `${minutesAgo}min` : '';
  const ago = daysString + (daysAgo > 0 || hoursAgo > 0 ? hoursString : '') + minutesString;

  return (
    <TableRow key={item.acc}>
      <TableData>{item.tweetWho}</TableData>
      <TableData>{item.tweetString}</TableData>
      <TableData style={{ whiteSpace: 'nowrap' }}>
        <div>{formattedTime}</div>
        <div>{ago}</div>
      </TableData>
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

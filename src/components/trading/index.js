import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import {atom, useAtom, useAtomValue } from 'jotai';

const API_URL = "http://localhost:8080/";
const DEX_SCREENER_URL = "https://api.dexscreener.com/latest/dex/search?q="

const tokenRankAtom = atom([]);


const OriginalTable = ({ onDataClick }) => {

  const tokenRankData = useAtomValue(tokenRankAtom);
  
  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => b.tokenWeight - a.tokenWeight  );
    setData(sortedData);
  };

  const handleTime = () => {
    const sortedData = [...data].sort((a, b) => a.earliestTimeDetection - b.earliestTimeDetection);
    setData(sortedData);
  };
  const [data, setData] = useState(tokenRankData);

    return(
    <Table>
    <thead>
      <TableRow>
        <TableHeader>Account</TableHeader>
        <TableHeader>Token</TableHeader>
        <TableHeader onClick={() => handleTime()}>Time</TableHeader>
        <TableHeader onClick={() => handleSort()}>Weight</TableHeader>
      </TableRow>
    </thead>
    <tbody>
      {data.map(item => (
        <TableRow key={item.tokenName} onClick={() => onDataClick(item)}>
        <TableData>{item.totalMentioned}</TableData>
        <TableData>${item.tokenName}</TableData>
        <TableData>{item.earliestTimeDetection}/oldest hrs ago</TableData>
        <TableData>{item.tokenWeight}</TableData>

        </TableRow>
      ))}
    </tbody>
  </Table>
    )
};

const NewTable = ({ data, onClose }) => {


  ;


  const convertTimeMstoAge = (timestamp) => {
      let convertedAge = timestamp / (1000 * 60);
      return convertedAge

  };


  

    // Function to handle redirection
    const redirectToPage = (event, pairAddress, token, chainId) => {
      event.preventDefault(); // Prevent default action of the link
  
      // Redirect to a different page with pairAddress as a parameter
      window.location.href = "dashboard?pairAddress=" + pairAddress + `/token=${token}` + `/chainId=${chainId}`;
    };

    return(
      <div> 
        <button onClick={onClose}>X</button>
    <Table>
    <thead>
      <TableRow>
        <TableHeader>CA</TableHeader>
        {/* <TableHeader>Age</TableHeader> */}
        <TableHeader>Chain</TableHeader>
        <TableHeader >Volume</TableHeader> 
        <TableHeader >Liquidity</TableHeader> {/*add sorting for this highest to lowest */}
        <TableHeader>Age</TableHeader>
      </TableRow>
    </thead>

    <tbody>
      {data.map(item => (
        <TableRow key={item.acc}>
        
        <TableData> <a href="#" onClick={(event) => redirectToPage(event, item.pairAddress, item.baseToken.symbol,item.chainId)}>
                  {item.pairAddress}
                </a></TableData>
        <TableData>{item.chainId}</TableData>
        <TableData>${item.volume.h24.toLocaleString()}</TableData>
        <TableData>${item.liquidity.usd.toLocaleString()}</TableData>
        <TableData>{convertTimeMstoAge(item.pairCreatedAt) > 60 
             ? (convertTimeMstoAge(item.pairCreatedAt) / 60).toFixed(2) + " hrs"
             : convertTimeMstoAge(item.pairCreatedAt) + "mins"
        }</TableData>

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
  const [tokenRank, setTokenRank] = useAtom(tokenRankAtom);
  const [loading, setLoading] = useState(true);

  const requestTokenRanking = async () => {
      const tokenData = await axios.get(API_URL + "tokenranking");
      const processedTokenData = processArray(tokenData.data);
      
      console.log(processedTokenData)
      setTokenRank(processedTokenData);
      setLoading(false);
  }

  const processArray = async (array) => {
    const currentTime = new Date().getTime();

    for(let i = 0; i < array.length; i++) {
      const tweetTimeDate = new Date(array[i].earliestTimeDetection).getTime();
      const timeDifferenceHours = ((currentTime - tweetTimeDate) / (1000 * 60 * 60)).toFixed(2);
      array[i].earliestTimeDetection = timeDifferenceHours; 

      array[i].tokenName = array[i].tokenName.toUpperCase();
    }

    return array;
  }

  const requestTokenDEXScreener = async (token) => {
      const tokenData = await axios.get(DEX_SCREENER_URL + token); //sssssssssssssssssssssss
      let tokenPairData = tokenData.data.pairs;
      
      //tokenPairData = tokenPairData.filter((item) => (item.chainId == "solana" || item.chainId == "ethereum") && item.baseToken.symbol === token);
      tokenPairData = tokenPairData.filter((item) => 
      ((item.chainId == "solana" || item.chainId == "ethereum") && 
      (item.baseToken.symbol === token || item.baseToken.symbol.startsWith("$" + token))));
    
    
      
      const currentTime = new Date().getTime();

      

      for(let i = 0; i < tokenPairData.length; i++) {
        console.log('before: ', tokenPairData[i].pairCreatedAt)
         const timeDifference = (currentTime - tokenPairData[i].pairCreatedAt);
         tokenPairData[i].pairCreatedAt = timeDifference;   
         console.log('after: ', tokenPairData[i].pairCreatedAt)
      }

      console.log("data",tokenPairData)
      return tokenPairData
  }

  const handleDataClick = async (rowData) => {
    // Generate new table data based on the clicked row
    const newTableData = [
      { column1: rowData.id, column2: rowData.name, column3: rowData.age, column4: 'Data 4', column5: 'Data 5' },
      // Add more rows as needed
    ];
    const tokenData = await requestTokenDEXScreener(rowData.tokenName);
    setNewTableData(tokenData);
    setShowOriginalTable(false);
  };

  const handleCloseNewTable = () => {
    setShowOriginalTable(true);
  };


  useEffect(() => {
    requestTokenRanking();
  }, [])
    

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
        {loading 
           ?  <div>Loading...</div>
           :  showOriginalTable  ? (
            <OriginalTable onDataClick={handleDataClick}  />
          ) : (
            <NewTable data={newTableData} onClose={handleCloseNewTable} />
          )
        }
      </Box3>
      </Container3>
    </Container>
  );
};



export default Trading;

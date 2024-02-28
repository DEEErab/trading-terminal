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
const hourAtom = atom();


const OriginalTable = ({ onDataClick, selectedInterval, handleIntervalChange, processArray }) => {

  const tokenRankData = useAtomValue(tokenRankAtom);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data based on the new interval
      const newData = await fetchNewData(selectedInterval);
      setData(newData);
    };

    fetchData();
  }, [selectedInterval]);

  const fetchNewData = async (interval) => {
    let url = API_URL + "tokenranking";
    if (interval !== "all") {
      url += "/" + interval;
    }

    try {
      const tokenData = await axios.get(url);
      const processedTokenData = processArray(tokenData.data);
      return processedTokenData;
    } catch (error) {
      console.error("Error fetching token data:", error);
      return [];
    }
  };
  
  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => b.tokenWeight - a.tokenWeight  );
    setData(sortedData);
  };

  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  const handleTime = () => {
      const sortedData = [...data].sort((a, b) => {
          const timeA = convertToMinutes(a.earliestTimeDetection);
          const timeB = convertToMinutes(b.earliestTimeDetection);
          return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
      });
  
      setData(sortedData);
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sorting order
  };

  const handleTime2 = () => {
    const sortedData = [...data].sort((a, b) => {
        const timeA = convertToMinutes(a.latestTimeDetection);
        const timeB = convertToMinutes(b.latestTimeDetection);
        return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    });

    setData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sorting order
};

const convertToMinutes = (time) => {
    const parts = time.split(' ');
    let totalMinutes = 0;
    if (parts.length === 2) {
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        totalMinutes = hours * 60 + minutes;
    } else if (parts.length === 1 && parts[0].includes('min')) {
        totalMinutes = parseInt(parts[0]);
    }
    return totalMinutes;
};

  const [data, setData] = useState(tokenRankData);

  // const [selectedInterval, setSelectedInterval] = useState('all');
  // const handleIntervalChange = (event) => {
  //   const interval = event.target.value;
  //   setSelectedInterval(interval);
  //   requestTokenRanking(interval === "all" ? "" : interval);
  // };

    return(
      <div>
        <select value={selectedInterval} onChange={handleIntervalChange}>
        <option value="all">All</option>
        <option value="1hr">1hr</option>
        <option value="6hr">6hr</option>
        <option value="12hr">12hr</option>
        <option value="24hr">24hr</option>
      </select>
    <Table>
    <thead>
      <TableRow>
        <TableHeader>Account</TableHeader>
        <TableHeader>Token</TableHeader>
        <TableHeader onClick={() => handleTime()}>Newest Time</TableHeader>
        <TableHeader onClick={() => handleTime2()}>Oldest Time</TableHeader>
        <TableHeader onClick={() => handleSort()}>Weight</TableHeader>
        <TableHeader></TableHeader>
      </TableRow>
    </thead>
    <tbody>
      {data.map(item => (
        <TableRow key={item.tweetToken} onClick={() => onDataClick(item)}>
        <TableData>{item.totalMentioned}</TableData>
        <TableData>${item.tweetToken}</TableData>
        <TableData>{item.earliestTimeDetection}</TableData>
        <TableData>{item.latestTimeDetection}</TableData>
        <TableData>{item.tokenWeight}</TableData>

        </TableRow>
      ))}
    </tbody>
  </Table>
  </div>
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
  const [selectedInterval, setSelectedInterval] = useState('all');
  const [showOriginalTable, setShowOriginalTable] = useState(true);
  const [newTableData, setNewTableData] = useState([]);
  const handleLinkClick = () => {
    // Perform any action you want when the box is clicked
    console.log('Dashboard clicked');
  };
  const [tokenRank, setTokenRank] = useAtom(tokenRankAtom);
  const [loading, setLoading] = useState(true);

  
  const handleIntervalChange = (event) => {
    const interval = event.target.value;
    console.log("interval", interval);
    setSelectedInterval(interval);
    requestTokenRanking(interval === "all" ? "" : interval);
  };
  
  

  const requestTokenRanking = async (interval) => {
    let url = API_URL + "tokenranking";
    if (interval !== "all") {
      url += "/" + interval;
    }
    console.log("url", url)
    try {
      const tokenData = await axios.get(url);
      console.log("tokendata", tokenData.data);
      const processedTokenData = processArray(tokenData.data);
  
      setTokenRank(processedTokenData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching token data:", error);
    }
  };



  const processArray = async (array) => {
    const currentTime = new Date().getTime();

    for (let i = 0; i < array.length; i++) {
      const tweetTimeDateEarliest = new Date(array[i].earliestTimeDetection).getTime();
      const tweetTimeDateLatest = new Date(array[i].latestTimeDetection).getTime();
  
      const timeDifferenceMinutesEarliest = ((currentTime - tweetTimeDateEarliest) / (1000 * 60)).toFixed(0);
      const timeDifferenceMinutesLatest = ((currentTime - tweetTimeDateLatest) / (1000 * 60)).toFixed(0);
  
      let formattedTimeEarliest = '';
      let formattedTimeLatest = '';
  
      if (timeDifferenceMinutesEarliest < 60) {
          formattedTimeEarliest = `${timeDifferenceMinutesEarliest}min`;
      } else {
          const hours = Math.floor(timeDifferenceMinutesEarliest / 60);
          const minutes = timeDifferenceMinutesEarliest % 60;
          formattedTimeEarliest = `${hours}hr ${minutes}min`;
      }
  
      if (timeDifferenceMinutesLatest < 60) {
          formattedTimeLatest = `${timeDifferenceMinutesLatest}min`;
      } else {
          const hours = Math.floor(timeDifferenceMinutesLatest / 60);
          const minutes = timeDifferenceMinutesLatest % 60;
          formattedTimeLatest = `${hours}hr ${minutes}min`;
      }
  
      array[i].earliestTimeDetection = formattedTimeEarliest;
      array[i].latestTimeDetection = formattedTimeLatest;
    }
    console.log("array", array)
    return array;
  }

  const requestTokenDEXScreener = async (token) => {
      const tokenData = await axios.get(DEX_SCREENER_URL + token); //sssssssssssssssssssssss
      let tokenPairData = tokenData.data.pairs;
      
      //tokenPairData = tokenPairData.filter((item) => (item.chainId == "solana" || item.chainId == "ethereum") && item.baseToken.symbol === token);
      tokenPairData = tokenPairData.filter((item) => 
      
    
      ((item.chainId == "solana" || item.chainId == "ethereum") && 
      (item.baseToken.symbol.toLowerCase() === token.toLowerCase() || item.baseToken.symbol.toLowerCase().startsWith("$" + token.toLowerCase()))));
    
      console.log("data",tokenPairData)

      
      const currentTime = new Date().getTime();

      

      for(let i = 0; i < tokenPairData.length; i++) {
        console.log('before: ', tokenPairData[i].pairCreatedAt)
         const timeDifference = (currentTime - tokenPairData[i].pairCreatedAt);
         tokenPairData[i].pairCreatedAt = timeDifference;   
         console.log('after: ', tokenPairData[i].pairCreatedAt)
      }

      
      return tokenPairData
  }

  const handleDataClick = async (rowData) => {
    // Generate new table data based on the clicked row
    const newTableData = [
      { column1: rowData.id, column2: rowData.name, column3: rowData.age, column4: 'Data 4', column5: 'Data 5' },
      // Add more rows as needed
    ];
    const tokenData = await requestTokenDEXScreener(rowData.tweetToken);
    setNewTableData(tokenData);
    setShowOriginalTable(false);
  };

  const handleCloseNewTable = () => {
    setShowOriginalTable(true);
  };


  useEffect(() => {
    requestTokenRanking("all"); // Fetch all tokens initially
  }, []);
  
    

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
            <OriginalTable
                  onDataClick={handleDataClick}
                  selectedInterval={selectedInterval}
                  handleIntervalChange={handleIntervalChange}
                  processArray={processArray}
                />
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

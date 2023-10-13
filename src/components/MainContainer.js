import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [originalStocks, setOriginalStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then((data) => {
        setOriginalStocks(data);
        setFilteredStocks(data);
      });
  }, []);

  function sortStocks(type) {
    let sortedStocks = [...filteredStocks];
    if (type === "Alphabetically") {
      sortedStocks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "Price") {
      sortedStocks.sort((a, b) => a.price - b.price);
    }
    setSortType(type);
    setFilteredStocks(sortedStocks);
  }

  function filterStocks(filterType) {
    let filteredStocks = originalStocks;
  
    if (filterType === "Tech" || filterType === "Sportswear" || filterType === "Finance") {
      filteredStocks = originalStocks.filter((stock) => stock.type === filterType);
    } else {
      filteredStocks = originalStocks;
    }

    if (sortType) {
      sortStocks(sortType);
    }
  
    setFilteredStocks(filteredStocks);
  }  

  function transferStockFromStocks(clickedStock) {
    const stockInPortfolio = portfolioStocks.find((stock) => stock.id === clickedStock.id);
    if (!stockInPortfolio) {
      setPortfolioStocks([...portfolioStocks, clickedStock]);
    }
  }

  function transferStockFromPortfolio(clickedStock) {
    setPortfolioStocks((prevStocks) => prevStocks.filter((stock) => stock.id !== clickedStock.id));
  }

  return (
    <div>
      <SearchBar filterStocks={filterStocks} sortStocks={sortStocks} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onAdd={transferStockFromStocks} />
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolioStocks} onRemove={transferStockFromPortfolio} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;

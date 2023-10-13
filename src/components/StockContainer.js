import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, onAdd }) {
  return (
    <div>
      <h2>Stocks</h2>
      {stocks.map((stock) => (
        <Stock key={stock.id} stock={stock} transferStock={onAdd} type={stock.type} />
      ))}
    </div>
  );
}

export default StockContainer;

export const calculatePrice = (supply: number): number => {
    // price = k * supply^n
    const k = 1; // constant factor
    const n = 2; // exponential factor
    return k * Math.pow(supply, n);
  };
  
  export const getMarketCap = (supply: number): number => {
    return calculatePrice(supply) * supply;
  };
  
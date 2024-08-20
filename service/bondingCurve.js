"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarketCap = exports.calculatePrice = void 0;
const calculatePrice = (supply) => {
    // price = k * supply^n
    const k = 1; // constant factor
    const n = 2; // exponential factor
    return k * Math.pow(supply, n);
};
exports.calculatePrice = calculatePrice;
const getMarketCap = (supply) => {
    return (0, exports.calculatePrice)(supply) * supply;
};
exports.getMarketCap = getMarketCap;

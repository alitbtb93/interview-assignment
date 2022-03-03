const priceSeparator = (price) => {
  if (typeof price !== "number") {
    return Number(price).toLocaleString("en-US");
  }
  return price.toLocaleString("en-US");
};

export default priceSeparator;

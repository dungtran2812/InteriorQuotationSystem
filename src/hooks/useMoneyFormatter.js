// useMoneyFormatter.js

const useMoneyFormatter = () => {
  const formatMoney = (amount) => {
    if (typeof amount === "number") {
      // Định dạng số nguyên
      return new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    } else if (typeof amount === "string") {
      // Xử lý trường hợp chuỗi
      const numericValue = parseFloat(amount);
      if (!isNaN(numericValue)) {
        return new Intl.NumberFormat("it-IT", {
          style: "currency",
          currency: "VND",
        }).format(numericValue);
      } else {
        // Trả về chuỗi không định dạng nếu không phải là số hợp lệ
        return amount;
      }
    } else {
      // Trả về nguyên giá trị nếu không phải số hoặc chuỗi
      return amount;
    }
  };

  return [formatMoney];
};

export default useMoneyFormatter;

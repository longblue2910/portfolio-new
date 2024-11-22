// utils/dateUtils.ts

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Định dạng ngày theo kiểu "Jan 12, 2024"
  const options: Intl.DateTimeFormatOptions = {
    month: "short", // Tháng (Jan, Feb, Mar...)
    day: "numeric", // Ngày (12, 13, 14...)
    year: "numeric", // Năm đầy đủ (2024)
  };

  return date.toLocaleDateString("en-US", options); // Định dạng ngày theo kiểu "Jan 12, 2024"
};

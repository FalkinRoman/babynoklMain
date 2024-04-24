import { useState } from "react";

const usePagination = (totalItems, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getOffset = () => {
    return (currentPage - 1) * itemsPerPage;
  };

  const getCurrentPageItems = (data) => {
    const start = getOffset();
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  return {
    currentPage,
    totalPages,
    handlePageChange,
    getOffset,
    getCurrentPageItems,
  };
};

export default usePagination;

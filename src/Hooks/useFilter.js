import { useMemo } from "react";

//массив, выбранная сортировка
export const useSortedCharts = (dataChars, sort) => {
  const sortedCharts = useMemo(() => {
    if (sort) {
      if (sort === "loyalty") {
        return [...dataChars].sort((a, b) => b.loyalty - a.loyalty);
      } else {
        return [...dataChars].sort((a, b) => a[sort].localeCompare(b[sort]));
      }
    }
    return dataChars;
  }, [sort, dataChars]);
  return sortedCharts;
};

//массив, сортировка и поиск
export const useFilter = (dataChars, sort, query) => {
  const sortedCharts = useSortedCharts(dataChars, sort);

  const sortedAndSearchedCharts = useMemo(() => {
    return sortedCharts.filter((p) => p.name.toLowerCase().includes(query));
  }, [sortedCharts, query]);
  return sortedAndSearchedCharts;
};

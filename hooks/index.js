import useSWR from 'swr';

import { useMemo } from 'react';
import { getDataAPI } from 'utils/fetch-data';

const fetcher = async (url) => await getDataAPI(url);

// fetch data for category navbar
export const useCategory = () => {
  const { data } = useSWR('category', fetcher);

  return data;
};

//customize pagination
const range = (start, end) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = 'DOTS';

export const usePagination = ({ totalPage, siblingCount = 1, currentPage }) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 2;

    //case 1: number of pages less than the page number
    if (totalPageNumbers >= totalPage) return range(1, totalPage);

    //calculate left and right sibling index
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage);

    //check show ... or not
    const showLeftDot = leftSiblingIndex > 1;
    const showRightDot = rightSiblingIndex < totalPage - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPage;

    //case 2: no dot left show, right dot show
    if (!showLeftDot && showRightDot) {
      const leftItemCount = 1 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPage];
    }

    //case 3: no right dot show, but left dot show
    if (showLeftDot && !showRightDot) {
      const rightItemCount = 1 + 2 * siblingCount;
      const rightRange = range(totalPage - rightItemCount + 1, totalPage);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    //case 4: both left and right dot show
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);

    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }, [siblingCount, currentPage, totalPage]);

  return paginationRange;
};

//fetch product by category
export const useListProductCategory = ({ category, limit, page }) => {
  const { data } = useSWR(
    `category/find-product?category=${category}&limit=${limit}&page=${page}`,
    fetcher
  );

  return data;
};

//fetch cart
export const useCart = () => {
  const { data } = useSWR('cart', fetcher);

  return data?.cart;
};

//fetch data product by condition
export const useProductByCondition = ({ query, limit, page }) => {
  const type = query === 'giam-gia' ? 'sale' : 'sold';
  const { data } = useSWR(
    `product/find-product?type=${type}&limit=${limit}&page=${page}`,
    fetcher
  );

  return data;
};

//fetch data cart by user
export const useDataCartUser = ({ userId, limit, page }) => {
  const { data } = useSWR(
    `cart/find-cart?user=${userId}&limit=${limit}&page=${page}`,
    fetcher
  );

  return data;
};

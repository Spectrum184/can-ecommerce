import Pagination from 'components/Pagination';
import ProductCard from 'components/ProductCard';

import { useListProductCategory } from 'hooks';
import { useState } from 'react';

const Category = ({ slug }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const result = useListProductCategory({
    category: slug,
    page: currentPage,
    limit: 12,
  });

  return (
    <div className="w-full mt-4">
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-0 w-full">
        {result?.products.length > 0 &&
          result?.products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
      </div>
      <div className="">
        {result?.total > 12 && (
          <Pagination
            onPageChange={(page) => setCurrentPage(page)}
            totalPage={total}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { slug } }) {
  return {
    props: { slug },
  };
}

export default Category;

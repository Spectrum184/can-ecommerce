import Pagination from 'components/Pagination';
import ProductCard from 'components/ProductCard';
import Head from 'next/head';
import Footer from 'components/Footer';
import Skeleton from 'components/Skeleton';

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
    <div className="w-full mt-4 px-0 md:px-10 pb-6">
      <Head>
        <title>Danh mục</title>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-0 w-full">
        {result
          ? result?.products.length > 0 &&
            result?.products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))
          : [0, 1, 2, 3].map((index) => <Skeleton key={index} />)}
      </div>
      <div className="mb-4">
        {result?.total > 1 && (
          <Pagination
            onPageChange={(page) => setCurrentPage(page)}
            totalPage={total}
            currentPage={currentPage}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ params: { slug } }) {
  return {
    props: { slug },
  };
}

export default Category;

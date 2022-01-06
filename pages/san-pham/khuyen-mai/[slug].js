import Footer from 'components/Footer';
import Pagination from 'components/Pagination';
import ProductCard from 'components/ProductCard';

import { useProductByCondition } from 'hooks';
import Head from 'next/head';
import { useState } from 'react';

const HighlightProduct = ({ slug }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const data = useProductByCondition({
    query: slug,
    limit: 12,
    page: currentPage,
  });

  return (
    <div className="w-full px-0 md:px-10 pb-4 mt-4">
      <Head>
        <title>Sản phẩm ưu đãi</title>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-0 w-full">
        {data?.result.length > 0 &&
          data?.result.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
      </div>
      <div className="mb-4">
        {data?.total > 1 && (
          <Pagination
            totalPage={data?.total}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
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

export default HighlightProduct;

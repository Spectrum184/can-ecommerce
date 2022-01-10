import Carousel from 'components/Carousel';
import Footer from 'components/Footer';
import ProductCard from 'components/ProductCard';
import Head from 'next/head';
import Link from 'next/link';

import { useDataProductOnSale } from 'hooks';
import { getDataAPI } from 'utils/fetch-data';

export default function Home({ bestSeller }) {
  const onSale = useDataProductOnSale();

  return (
    <div className="w-full px-0 md:px-10">
      <Head>
        <title>Aichi xinh</title>
      </Head>
      <div className="w-full">
        <Carousel />
      </div>
      <section id="product-on-sale" className="mt-6 pb-4 w-full">
        <div className="w-full rounded-t md:h-14 h-16 mb-2 bg-indigo-500 flex items-center justify-between">
          <span className="ml-4 text-2xl uppercase font-semibold text-white">
            Sản phẩm đang bán chạy
          </span>
          <span className="hover:text-gray-200 text-white mr-2">
            <Link href={'/san-pham/khuyen-mai/ban-chay'}>
              <a>
                <span className="hidden md:block">Xem thêm</span>
                <span className="md:hidden">&#10093;</span>
              </a>
            </Link>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-0 w-full">
          {bestSeller?.length > 0 &&
            bestSeller?.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
        </div>
      </section>
      <section id="product-on-sale" className="mt-6 w-full">
        <div className="w-full rounded-t md:h-14 h-16 mb-2 bg-indigo-500 flex items-center justify-between">
          <span className="ml-4 text-2xl uppercase font-semibold text-white">
            Sản phẩm đang giảm giá
          </span>
          <span className="hover:text-gray-200 text-white mr-2">
            <Link href={'/san-pham/khuyen-mai/giam-gia'}>
              <a>
                <span className="hidden md:block">Xem thêm</span>
                <span className="md:hidden">&#10093;</span>
              </a>
            </Link>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-0 w-full">
          {onSale?.result?.length > 0 &&
            onSale?.result?.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  // const onSale = await getDataAPI(
  //   `product/find-product?type=sale&limit=4&page=1`
  // );
  const bestSeller = await getDataAPI(
    `product/find-product?type=sold&limit=4&page=1`
  );
  return {
    props: { bestSeller: bestSeller.result },
  };
}

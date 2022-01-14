import Carousel from 'components/Carousel';
import Footer from 'components/Footer';
import ProductCard from 'components/ProductCard';
import Head from 'next/head';
import Link from 'next/link';
import Product from 'models/productModel';
import Cache from 'utils/cache';

// import { getDataAPI } from 'utils/fetch-data';
import { connectDB } from 'utils/connect-db';

export default function Home({ onSale, bestSeller }) {
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
          {bestSeller.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </section>
      <section id="product-on-sale" className="my-6 w-full">
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
          {onSale.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  connectDB();
  const ttl = 60 * 60 * 6;
  const cache = new Cache(ttl);

  // const data = await getDataAPI('product/find-product/home');

  const onSale = await cache.get('on-sale', () =>
    Product.find()
      .select('-content')
      .sort('-salePrice')
      .limit(4)
      .then((data) => data)
  );

  const bestSeller = await cache.get('best-seller', () =>
    Product.find()
      .limit(4)
      .sort('-sold')
      .select('-content')
      .then((data) => data)
  );

  return {
    props: {
      onSale: JSON.parse(JSON.stringify(onSale)),
      bestSeller: JSON.parse(JSON.stringify(bestSeller)),
    },
  };
}

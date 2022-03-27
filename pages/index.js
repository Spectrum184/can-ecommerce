import Carousel from 'components/Carousel';
import Footer from 'components/Footer';
import ProductCard from 'components/ProductCard';
import Head from 'next/head';
import Link from 'next/link';
import Product from 'models/productModel';
import Cache from 'utils/cache';
import Category from 'models/categoryModel';
import Image from 'next/image';

import { connectDB } from 'utils/connect-db';
import { useRouter } from 'next/router';

export default function Home({
  cosmeticProducts,
  healthcareProducts,
  fashionProducts,
  foodsProducts,
  babyProducts,
  luxuryProducts,
  accessoriesProducts,
}) {
  const router = useRouter();
  const tags = [
    'covid19',
    'dulichthoi',
    'taoxoannhatban',
    'hamtreem',
    'lanmuoichobe',
    'chamsocmebau',
    'viemngatmui',
    'dauxuongkhop',
    'vitamin',
    'chamsocda',
    'boxungkem',
    'chongnang',
    'moixinh',
    'khumui',
    'giamcan',
    'matna',
    'vayxinh',
    'sexy',
    'unisex',
    'nhaxinh',
    'cosplay',
  ];

  return (
    <div className="w-full px-0 md:px-10">
      <Head>
        <title>Kantan Store</title>
      </Head>
      <div className="w-full">
        <Carousel />
      </div>
      <div className="w-full flex flex-wrap my-2">
        {tags.map((item, index) => (
          <Link key={index} href={`/the/${item}`}>
            <a>
              <span className="mx-1 underline cursor-pointer text-xl">
                #{item}
              </span>
            </a>
          </Link>
        ))}
      </div>
      <section id="luxury-product" className="pb-4 w-full">
        <div className="w-full rounded-t md:h-14 h-16 mb-2 bg-indigo-500 flex items-center justify-between">
          <span className="ml-4 text-2xl uppercase font-semibold text-white">
            Hàng cao cấp bán chạy
          </span>
          <span className="hover:text-gray-200 text-white mr-2">
            <Link href={'/san-pham/danh-muc-chinh/cao-cap'}>
              <a>
                <span className="hidden md:block">Xem thêm</span>
                <span className="md:hidden">&#10093;</span>
              </a>
            </Link>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-0 w-full">
          <div
            className="w-full shadow relative border p-4 my-3 md:my-0 h-96 md:h-auto cursor-pointer"
            onClick={() => router.push('/san-pham/danh-muc-chinh/cao-cap')}
          >
            <Image
              src="can-ecommerce/1Caocap_rdxwpj.jpg"
              alt="product"
              className="md:object-cover object-fill"
              layout="fill"
              priority
            ></Image>
          </div>
          {luxuryProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </section>
      <section id="baby" className="mt-6 pb-4 w-full">
        <div className="w-full rounded-t md:h-14 h-16 mb-2 bg-indigo-500 flex items-center justify-between">
          <span className="ml-4 text-2xl uppercase font-semibold text-white">
            Mẹ và bé
          </span>
          <span className="hover:text-gray-200 text-white mr-2">
            <Link href={'/san-pham/danh-muc-chinh/me-be'}>
              <a>
                <span className="hidden md:block">Xem thêm</span>
                <span className="md:hidden">&#10093;</span>
              </a>
            </Link>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-0 w-full">
          <div
            className="w-full shadow relative border p-4 my-3 md:my-0 h-96 md:h-auto cursor-pointer"
            onClick={() => router.push('/san-pham/danh-muc-chinh/me-be')}
          >
            <Image
              src="can-ecommerce/1Caocap_rdxwpj.jpg"
              alt="product"
              className="md:object-cover object-fill"
              layout="fill"
              priority
            ></Image>
          </div>

          {babyProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </section>
      <section id="healthcare" className="my-6 w-full">
        <div className="w-full rounded-t md:h-14 h-16 mb-2 bg-indigo-500 flex items-center justify-between">
          <span className="ml-4 text-2xl uppercase font-semibold text-white">
            Sống khoẻ có ích
          </span>
          <span className="hover:text-gray-200 text-white mr-2">
            <Link href={'/san-pham/danh-muc-chinh/song-khoe'}>
              <a>
                <span className="hidden md:block">Xem thêm</span>
                <span className="md:hidden">&#10093;</span>
              </a>
            </Link>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-0 w-full">
          <div
            className="w-full shadow relative border p-4 my-3 md:my-0 h-96 md:h-auto cursor-pointer"
            onClick={() => router.push('/san-pham/danh-muc-chinh/song-khoe')}
          >
            <Image
              src="can-ecommerce/1Songkhoe_zueucm.jpg"
              alt="product"
              className="md:object-cover object-fill"
              layout="fill"
              priority
            ></Image>
          </div>

          {healthcareProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </section>
      <section id="cosmetic" className="my-6 w-full">
        <div className="w-full rounded-t md:h-14 h-16 mb-2 bg-indigo-500 flex items-center justify-between">
          <span className="ml-4 text-2xl uppercase font-semibold text-white">
            Mỹ phẩm bán chạy
          </span>
          <span className="hover:text-gray-200 text-white mr-2">
            <Link href={'/san-pham/danh-muc-chinh/my-pham'}>
              <a>
                <span className="hidden md:block">Xem thêm</span>
                <span className="md:hidden">&#10093;</span>
              </a>
            </Link>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-0 w-full">
          <div
            className="w-full shadow relative border p-4 my-3 md:my-0 h-96 md:h-auto cursor-pointer"
            onClick={() => router.push('/san-pham/danh-muc-chinh/my-pham')}
          >
            <Image
              src="can-ecommerce/1Mypham_yovnmx.jpg"
              alt="product"
              className="md:object-cover object-fill"
              layout="fill"
              priority
            ></Image>
          </div>
          {cosmeticProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </section>
      <section id="fashion" className="my-6 w-full">
        <div className="w-full rounded-t md:h-14 h-16 mb-2 bg-indigo-500 flex items-center justify-between">
          <span className="ml-4 text-2xl uppercase font-semibold text-white">
            Thời trang bán chạy
          </span>
          <span className="hover:text-gray-200 text-white mr-2">
            <Link href={'/san-pham/danh-muc-chinh/thoi-trang'}>
              <a>
                <span className="hidden md:block">Xem thêm</span>
                <span className="md:hidden">&#10093;</span>
              </a>
            </Link>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-0 w-full">
          <div
            className="w-full shadow relative border p-4 my-3 md:my-0 h-96 md:h-auto cursor-pointer"
            onClick={() => router.push('/san-pham/danh-muc-chinh/thoi-trang')}
          >
            <Image
              src="can-ecommerce/1Khongcogidemac_vshci7.jpg"
              alt="product"
              className="md:object-cover object-fill"
              layout="fill"
              priority
            ></Image>
          </div>

          {fashionProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </section>
      <section id="foods" className="my-6 w-full">
        <div className="w-full rounded-t md:h-14 h-16 mb-2 bg-indigo-500 flex items-center justify-between">
          <span className="ml-4 text-2xl uppercase font-semibold text-white">
            Đồ ăn bán chạy
          </span>
          <span className="hover:text-gray-200 text-white mr-2">
            <Link href={'/san-pham/danh-muc-chinh/do-an'}>
              <a>
                <span className="hidden md:block">Xem thêm</span>
                <span className="md:hidden">&#10093;</span>
              </a>
            </Link>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-0 w-full">
          <div
            className="w-full shadow relative border p-4 my-3 md:my-0 h-96 md:h-auto cursor-pointer"
            onClick={() => router.push('/san-pham/danh-muc-chinh/do-an')}
          >
            <Image
              src="can-ecommerce/1Emdoi_st3pzv.jpg"
              alt="product"
              className="md:object-cover object-fill"
              layout="fill"
              priority
            ></Image>
          </div>

          {foodsProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </section>
      <section id="accessories" className="my-6 w-full">
        <div className="w-full rounded-t md:h-14 h-16 mb-2 bg-indigo-500 flex items-center justify-between">
          <span className="ml-4 text-2xl uppercase font-semibold text-white">
            Phụ kiện bán chạy
          </span>
          <span className="hover:text-gray-200 text-white mr-2">
            <Link href={'/san-pham/danh-muc-chinh/phu-kien'}>
              <a>
                <span className="hidden md:block">Xem thêm</span>
                <span className="md:hidden">&#10093;</span>
              </a>
            </Link>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-0 w-full">
          <div
            className="w-full shadow relative border p-4 my-3 md:my-0 h-96 md:h-auto cursor-pointer"
            onClick={() => router.push('/san-pham/danh-muc-chinh/phu-kien')}
          >
            <Image
              src="can-ecommerce/1Phukien_n1pgyt.jpg"
              alt="product"
              className="md:object-cover object-fill"
              layout="fill"
              priority
            ></Image>
          </div>

          {accessoriesProducts.map((product) => (
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

  // add Model Product for serverless
  Product.findOne();

  const cosmeticProducts = await cache.get('cosmetic-product', () =>
    Category.find({ category: 2 })
      .populate({
        path: 'products',
        select: '-content',
        sort: '-sold',
        limit: 2,
      })
      .then((data) => {
        const arrProducts = [];

        for (const item of data) {
          arrProducts.push(...item.products);
        }

        //take 4 first item
        return arrProducts.sort((a, b) => a.sold - b.sold).slice(0, 3);
      })
  );

  const luxuryProducts = await cache.get('luxury-product', () =>
    Category.find({ category: 1 })
      .populate({
        path: 'products',
        select: '-content',
        sort: '-sold',
        limit: 1,
      })
      .then((data) => {
        const arrProducts = [];

        for (const item of data) {
          arrProducts.push(...item.products);
        }

        //take 4 first item
        return arrProducts.sort((a, b) => a.sold - b.sold).slice(0, 3);
      })
  );

  const fashionProducts = await cache.get('fashion-product', () =>
    Category.find({ category: 3 })
      .populate({
        path: 'products',
        select: '-content',
        sort: '-sold',
        limit: 3,
      })
      .then((data) => {
        const arrProducts = [];

        for (const item of data) {
          arrProducts.push(...item.products);
        }

        //take 4 first item
        return arrProducts.sort((a, b) => a.sold - b.sold).slice(0, 3);
      })
  );

  const foodsProducts = await cache.get('food-product', () =>
    Category.find({ category: 4 })
      .populate({
        path: 'products',
        select: '-content',
        sort: '-sold',
        limit: 4,
      })
      .then((data) => {
        const arrProducts = [];

        for (const item of data) {
          arrProducts.push(...item.products);
        }

        //take 4 first item
        return arrProducts.sort((a, b) => a.sold - b.sold).slice(0, 3);
      })
  );

  const accessoriesProducts = await cache.get('accessory-product', () =>
    Category.find({ category: 5 })
      .populate({
        path: 'products',
        select: '-content',
        sort: '-sold',
        limit: 5,
      })
      .then((data) => {
        const arrProducts = [];

        for (const item of data) {
          arrProducts.push(...item.products);
        }

        //take 4 first item
        return arrProducts.sort((a, b) => a.sold - b.sold).slice(0, 3);
      })
  );

  const babyProducts = await cache.get('baby-product', () =>
    Category.find({ category: 6 })
      .populate({
        path: 'products',
        select: '-content',
        sort: '-sold',
        limit: 6,
      })
      .then((data) => {
        const arrProducts = [];

        for (const item of data) {
          arrProducts.push(...item.products);
        }

        //take 4 first item
        return arrProducts.sort((a, b) => a.sold - b.sold).slice(0, 3);
      })
  );

  const healthcareProducts = await cache.get('healthcare-product', () =>
    Category.find({ category: 7 })
      .populate({
        path: 'products',
        select: '-content',
        sort: '-sold',
        limit: 7,
      })
      .then((data) => {
        const arrProducts = [];

        for (const item of data) {
          arrProducts.push(...item.products);
        }

        //take 4 first item
        return arrProducts.sort((a, b) => a.sold - b.sold).slice(0, 3);
      })
  );

  return {
    props: {
      cosmeticProducts: JSON.parse(JSON.stringify(cosmeticProducts)),
      healthcareProducts: JSON.parse(JSON.stringify(healthcareProducts)),
      babyProducts: JSON.parse(JSON.stringify(babyProducts)),
      accessoriesProducts: JSON.parse(JSON.stringify(accessoriesProducts)),
      foodsProducts: JSON.parse(JSON.stringify(foodsProducts)),
      fashionProducts: JSON.parse(JSON.stringify(fashionProducts)),
      luxuryProducts: JSON.parse(JSON.stringify(luxuryProducts)),
    },
  };
}

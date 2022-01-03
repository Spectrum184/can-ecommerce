import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { getDataAPI } from 'utils/fetch-data';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const Product = ({ product }) => {
  const [imageTab, setImageTab] = useState(0);
  const { data } = useSession();

  if (product.error)
    return (
      <div className="w-full mt-4">
        <h1 className="text-red-500 mx-auto text-center text-2xl">
          Không tồn tại sản phẩm này
        </h1>
      </div>
    );

  return (
    <div className="w-full">
      <Head>
        <title>{product.title}</title>
      </Head>
      <section id="product-image" className="w-full mt-4 flex flex-wrap">
        <div className="w-full md:w-2/3 mb-3 md:mb-0">
          <div className="w-full relative mb-4 h-96">
            <Image
              src={product.images[imageTab].url}
              layout="fill"
              alt="product-image"
              priority
              className="rounded-sm object-cover"
            ></Image>
          </div>
          <div className="w-full grid grid-cols-5 md:gap-4 gap-1">
            {product.images.map((image, index) => (
              <div
                className="relative cursor-pointer md:h-32 h-24  border rounded-sm border-indigo-400"
                key={index}
                onClick={() => setImageTab(index)}
              >
                <Image
                  src={image.url}
                  layout="fill"
                  alt="product-image"
                  className="rounded-sm object-cover"
                  priority
                ></Image>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="p-4 bg-white ml-0 md:ml-4 rounded-sm">
            <p className="text-2xl mx-auto text-center text-indigo-400 font-bold w-full">
              {product.title}
            </p>
            {product.salePrice !== 0 ? (
              <div className="w-full text-lg my-2">
                Giá:
                <span className="text-red-500 ml-2">
                  {product.salePrice
                    .toString()
                    .substring(0, product.salePrice.toString().length - 3)}
                  K
                </span>
                <span className="mx-2">|</span>
                <span className="line-through">
                  {product.price
                    .toString()
                    .substring(0, product.price.toString().length - 3)}
                  K
                </span>
              </div>
            ) : (
              <div className="w-full">
                Giá:
                <span className="ml-2 text-red-500">
                  {product.price
                    .toString()
                    .substring(0, product.price.toString().length - 3)}
                  K
                </span>
              </div>
            )}
            <div className="w-full text-lg my-2">
              Đã bán:
              <span className="text-red-500 mx-2">{product.sold}</span>
              sản phẩm
            </div>
            <div className="w-full text-lg my-2">
              Chỉ còn:
              <span className="text-red-500 mx-2">{product.inStock}</span>
              sản phẩm
            </div>
            <div className="w-full text-lg my-2">
              Lượt ưng:
              <span className="text-red-500 mx-2">{product.likes.length}</span>
            </div>
            <button className="py-3 px-6 my-2 text-white rounded-lg bg-indigo-500 w-full shadow-lg block md:inline-block">
              Mua ngay
            </button>
            {data?.user.role === 'admin' && (
              <Link href={`/quan-ly/san-pham/${product.slug}`}>
                <a className="py-3 px-6 text-white rounded-lg bg-purple-500 text-center w-full shadow-lg block md:inline-block">
                  Quản lý
                </a>
              </Link>
            )}
          </div>
        </div>
      </section>
      <section id="product-overview" className="w-full mt-4">
        <div className="w-full flex md:w-2/3 flex-wrap justify-center bg-white rounded-sm p-2 md:p-4">
          <p className="text-2xl w-full text-center font-bold m-5">Đánh giá</p>
          <div
            className="w-full mt-3"
            dangerouslySetInnerHTML={{ __html: product.content }}
          ></div>
        </div>
      </section>
      <section id="product-comment pb-4">
        <h1>Comment</h1>
      </section>
    </div>
  );
};

export async function getServerSideProps({ params: { slug } }) {
  const res = await getDataAPI(`product/${slug}`);
  return {
    props: { product: res },
  };
}

export default Product;

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import CommentDisplay from 'components/CommentDisplay';
import Pagination from 'components/Pagination';

import { deleteDataAPI, getDataAPI, postDataAPI } from 'utils/fetch-data';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toastNotify } from 'utils/toast';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { useDataComment } from 'hooks';
import Footer from 'components/Footer';

const Product = ({ product }) => {
  const [imageTab, setImageTab] = useState(0);
  const { data } = useSession();
  const { mutate } = useSWRConfig();
  const [comment, setComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const dataComments = useDataComment({
    productId: product._id,
    page: currentPage,
    limit: 10,
  });

  if (product.error)
    return (
      <div className="w-full mt-4">
        <h1 className="text-red-500 mx-auto text-center text-2xl">
          Không tồn tại sản phẩm này
        </h1>
      </div>
    );

  const handleBuyProduct = async () => {
    if (data) {
      const cart = {
        productId: product._id,
        quantity: 1,
        name: product.title,
        price: product.salePrice === 0 ? product.price : product.salePrice,
        image: product.images[0].url,
      };
      const res = await postDataAPI('cart', cart);

      toastNotify(res);
      mutate('cart');
    } else {
      router.push(`/gio-hang/${product.slug}`);
    }
  };

  const onComment = async (e) => {
    e.preventDefault();
    const dataComment = {
      productId: product._id,
      user: data?.user._id,
      content: comment.substring(0, 200),
    };

    const res = await postDataAPI('comment', dataComment);

    setComment('');

    toastNotify(res);

    if (res.message)
      mutate(`comment?productId=${product._id}&limit=10&page=${currentPage}`);
  };

  const onDeleteProduct = async () => {
    if (confirm('Chắc chắn xoá?')) {
      const res = await deleteDataAPI(`product/${product._id}`);

      toastNotify(res);

      if (res.message) router.push('/');
    }
  };

  return (
    <div className="w-full pb-6">
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title}></meta>
        <meta content="INDEX,FOLLOW" name="robots"></meta>
        <meta name="author" content="Thanh đẹp trai"></meta>
        <meta name="copyright" content="Thanh đẹp trai"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:locale" content="vi_VN"></meta>
        <meta property="og:description" content={product.description}></meta>
        <meta name="keywords" content=""></meta>
        <meta property="og:image" content={product.images[0].secureUrl}></meta>
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
          <div className="p-6 bg-white ml-0 md:ml-4 rounded-sm">
            <p className="text-2xl mx-auto text-center text-indigo-500 font-bold w-full">
              {product.title.toUpperCase()}
            </p>
            {product.salePrice !== 0 ? (
              <div className="w-full text-lg font-bold my-2">
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
              <div className="w-full font-bold">
                Giá:
                <span className="ml-2 text-red-500">
                  {product.price
                    .toString()
                    .substring(0, product.price.toString().length - 3)}
                  K
                </span>
              </div>
            )}
            <div className="w-full text-lg my-2 font-bold">
              Đã bán:
              <span className="text-red-500 mx-2 font-bold">
                {product.sold}
              </span>
              sản phẩm
            </div>
            <div className="w-full text-lg my-2 font-bold">
              Chỉ còn:
              <span className="text-red-500 mx-2 font-bold">
                {product.inStock}
              </span>
              sản phẩm
            </div>
            <div className="w-full text-lg my-2 font-bold">
              Lượt ưng:
              <span className="text-red-500 mx-2 font-bold">
                {product.likes.length}
              </span>
            </div>

            {data?.user.role === 'admin' ? (
              <div>
                <Link href={`/quan-ly/san-pham/${product.slug}`}>
                  <a className="py-3 px-6 my-1 text-white rounded-lg bg-purple-500 text-center w-full shadow-lg block md:inline-block">
                    Quản lý
                  </a>
                </Link>
                <button
                  onClick={onDeleteProduct}
                  className="py-3 my-1 px-6 text-white rounded-lg bg-red-500 text-center w-full shadow-lg block md:inline-block"
                >
                  Xoá
                </button>
              </div>
            ) : (
              <button
                onClick={handleBuyProduct}
                className="py-3 px-6 my-1 text-white rounded-lg bg-indigo-500 w-full shadow-lg block md:inline-block"
              >
                Mua ngay
              </button>
            )}
          </div>
        </div>
      </section>
      <section id="product-overview" className="w-full mt-4">
        <div className="w-full flex md:w-2/3 flex-wrap justify-center bg-white rounded-sm p-2 md:p-4">
          <p className="text-2xl w-full uppercase text-center font-bold m-4">
            Thông tin sản phẩm
          </p>
          <div
            className="w-full mt-3"
            dangerouslySetInnerHTML={{ __html: product.content }}
          ></div>
        </div>
      </section>
      <section id="product-comment" className="mt-4">
        <div className="w-full md:w-2/3">
          <div
            className="bg-gray-300 mt-3 w-2/3 text-center mx-auto"
            style={{ height: '1px' }}
          ></div>
          <p className="text-2xl uppercase text-center font-bold mt-2">
            Bình luận đánh giá
          </p>
          <div className="mt-3">
            {data ? (
              <div className="">
                <form onSubmit={onComment}>
                  <textarea
                    type="text"
                    name="comment"
                    className="w-full px-4 py-3 mb-2 border border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                    placeholder="Viết bình luận không quá 200 chữ..."
                    rows="3"
                    cols="33"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <input
                    type="submit"
                    value="Đánh giá"
                    name="submit"
                    className="text-white px-4 hover:bg-indigo-400 py-2 bg-indigo-500 cursor-pointer rounded-md"
                  />
                </form>
              </div>
            ) : (
              <h2 className="mx-auto text-center">
                Vui lòng{' '}
                <Link href="/dang-nhap">
                  <a className="underline text-red-500">đăng nhập</a>
                </Link>{' '}
                để nhận xét
              </h2>
            )}
          </div>
          <div className="mt-3">
            {dataComments?.comments?.length > 0 &&
              dataComments?.comments.map((comment) => (
                <CommentDisplay
                  key={comment._id}
                  {...comment}
                  page={currentPage}
                  productId={product._id}
                />
              ))}
            {dataComments?.total > 1 && (
              <Pagination
                onPageChange={(page) => setCurrentPage(page)}
                totalPage={dataComments.total}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
      </section>
      <Footer />
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

import CartItem from 'components/CartItem';
import Head from 'next/head';

import { useCart } from 'hooks';
import { useState } from 'react';
import { getDataAPI } from 'utils/fetch-data';

const Cart = ({ slug, product }) => {
  const [total, setTotal] = useState(0);
  const cart = useCart();

  console.log(a);

  return (
    <div className="w-full px-0 md:px-10 mt-4 block md:flex pb-6">
      <Head>
        <title>Giỏ hàng</title>
      </Head>
      <div className="w-full md:w-2/3 pt-4">
        <h1 className="w-full text-center font-semibold mx-auto text-2xl text-gray-700">
          THÔNG TIN GIỎ HÀNG
        </h1>
        {cart ? (
          cart.products.map((item) => <CartItem key={item._id} {...item} />)
        ) : (
          <h3 className="w-full text-center mx-auto text-xl text-gray-700">
            Bạn chưa thêm hàng vào giỏ!
          </h3>
        )}
      </div>
      <div className="w-full md:w-1/3 md:pl-5 pl-0 inline-block pt-4">
        <h1 className="w-full text-center font-semibold mx-auto text-2xl text-gray-700 mb-4">
          THÔNG TIN ĐẶT HÀNG
        </h1>
        <div className="">
          <span className="flex mb-5 text-md">
            <span className="bg-indigo-500 w-28 font-semibold text-center text-white p-2 px-5 rounded-l">
              Địa chỉ
            </span>
            <input
              className="field text-md text-gray-600 p-1 px-3 rounded-r w-full border border-gray-500"
              type="text"
            />
          </span>
          <span className="flex mb-5 text-md">
            <span className="bg-indigo-500 w-28 font-semibold text-center text-white p-2 px-5 rounded-l">
              SDT
            </span>
            <input
              className="field text-md text-gray-600 p-1 px-3 rounded-r w-full border border-gray-500"
              type="text"
            />
          </span>
          <span className="my-5 w-full text-xl text-red-500 text-md font-semibold">
            Tổng tiền: {total}
          </span>
          <button className="py-2 mt-3 px-5 w-full text-white rounded-sm bg-indigo-500 hover:bg-indigo-400 block md:inline-block">
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { slug } }) {
  let product;

  if (slug !== '1') {
    product = await getDataAPI(`product/${slug}`);
  }

  return {
    props: { slug, product: product ? product : null },
  };
}

export default Cart;

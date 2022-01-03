import CartItem from 'components/CartItem';
import Head from 'next/head';

import { useCart } from 'hooks';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { validateMobile } from 'utils/validate';
import { postDataAPI } from 'utils/fetch-data';
import { toastNotify } from 'utils/toast';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';

const Cart = () => {
  const initialState = {
    address: '',
    mobile: '',
  };

  const [total, setTotal] = useState(0);
  const [cartData, setCartData] = useState();
  const [deliverInfo, setDeliverInfo] = useState(initialState);
  const cart = useCart();
  const { address, mobile } = deliverInfo;
  const { mutate } = useSWRConfig();
  const router = useRouter();

  useEffect(() => {
    if (cart) setCartData(cart);
  }, [cart]);

  useEffect(() => {
    if (cartData) {
      const getTotal = () => {
        const res = cartData.products.reduce((prev, item) => {
          return prev + item.price * item.quantity;
        }, 0);

        setTotal(res);
      };

      getTotal();
    }
  }, [cartData]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setDeliverInfo({ ...deliverInfo, [name]: value });
  };

  const onOrder = async (e) => {
    e.preventDefault();

    if (cartData?.products.length === 0) {
      toast.error('Giỏ hàng trống!');

      return;
    }

    const testPhone = validateMobile(mobile);

    if (!mobile || !testPhone) {
      toast.error('Vui lòng điền đúng số điện thoại!');
      return;
    }

    const res = await postDataAPI('order', { cartData, address, mobile });

    toastNotify(res);
    if (res.message) {
      router.push('/');
      mutate('cart');
    }
  };

  return (
    <div className="w-full px-0 md:px-10 mt-4 block md:flex pb-6">
      <Head>
        <title>Giỏ hàng</title>
      </Head>
      <div className="w-full md:w-2/3 pt-4">
        <h1 className="w-full text-center font-semibold mx-auto text-2xl text-gray-700">
          THÔNG TIN GIỎ HÀNG
        </h1>
        {cartData ? (
          cartData?.products.map((item) => (
            <CartItem
              key={item._id}
              {...item}
              setCartData={setCartData}
              cartId={cartData._id}
            />
          ))
        ) : (
          <h3 className="w-full text-center mx-auto text-xl text-gray-700">
            Bạn chưa thêm hàng vào giỏ!
          </h3>
        )}
      </div>
      <div className="w-full md:w-1/3 md:pl-6 pl-0 inline-block pt-4">
        <h1 className="w-full text-center font-semibold mx-auto text-2xl text-gray-700 mb-5">
          THÔNG TIN ĐẶT HÀNG
        </h1>
        <form action="POST" onSubmit={onOrder}>
          <div className="">
            <span className="flex mb-5 text-md">
              <span className="bg-indigo-500 w-28 font-semibold text-center text-white p-2 px-5 rounded-l">
                Địa chỉ
              </span>
              <input
                name="address"
                value={address}
                onChange={handleInput}
                className="field text-md text-gray-600 p-1 px-3 rounded-r w-full border border-gray-500"
                type="text"
              />
            </span>
            <span className="flex mb-5 text-md">
              <span className="bg-indigo-500 w-28 font-semibold text-center text-white p-2 px-5 rounded-l">
                SDT
              </span>
              <input
                name="mobile"
                value={mobile}
                onChange={handleInput}
                className="field text-md text-gray-600 p-1 px-3 rounded-r w-full border border-gray-500"
                type="text"
              />
            </span>
            <span className="my-5 w-full text-xl text-red-500 text-md font-semibold">
              Tổng tiền: {total}
            </span>
            <button
              type="submit"
              className="py-2 mt-3 px-5 w-full text-white rounded-sm bg-indigo-500 hover:bg-indigo-400 block md:inline-block"
            >
              Đặt hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cart;

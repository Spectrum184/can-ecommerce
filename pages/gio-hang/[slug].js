import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { getDataAPI, postDataAPI } from 'utils/fetch-data';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { validateMobile } from 'utils/validate';
import { toastNotify } from 'utils/toast';

const TemporaryCart = ({ product }) => {
  const router = useRouter();
  const initialState = {
    address: '',
    mobile: '',
    fixedAddress: '',
  };
  const [deliverInfo, setDeliverInfo] = useState(initialState);
  const { address, mobile, fixedAddress } = deliverInfo;
  const { data } = useSession();
  const [newQuantity, setNewQuantity] = useState(1);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setDeliverInfo({ ...deliverInfo, [name]: value });
  };

  useEffect(() => {
    if (data) router.push('/');
  }, [data, router]);

  if (product.error)
    return (
      <div className="w-full px-0 md:px-10 mt-4 block md:flex pb-6">
        <h1 className="w-full text-center font-semibold mx-auto text-2xl text-gray-700">
          GIỎ HÀNH TRỐNG
        </h1>
      </div>
    );
  const onOrder = async (e) => {
    e.preventDefault();

    const testPhone = validateMobile(mobile);

    if (!mobile || !testPhone) {
      toast.error('Vui lòng điền đúng số điện thoại!');
      return;
    }
    const newProduct = {
      productId: product._id,
      quantity: newQuantity,
      name: product.title,
      price: product.salePrice ? product.salePrice : product.price,
      image: product.images[0].url,
    };

    const res = await postDataAPI('order-temporary', {
      product: newProduct,
      address: fixedAddress ? fixedAddress : address,
      mobile,
    });

    toastNotify(res);

    if (res.message) {
      router.push('/');
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
        <div className="flex flex-col md:flex-row justify-between w-full border-t border-gray-400 pt-2 my-6 px-0 md:px-4">
          <div className="flex items-center justify-center">
            <div className="p-2 rounded-sm bg-white mr-4">
              <Link href={`/san-pham/${product.slug}`}>
                <a>
                  <div className="relative w-32 h-32 border border-gray-400 rounded-sm">
                    <Image
                      src={product.images[0].url}
                      alt="product"
                      layout="fill"
                      className="object-cover rounded-sm"
                      priority
                    ></Image>
                  </div>
                </a>
              </Link>
            </div>
            <div className="flex flex-col">
              <Link href={`/san-pham/${product.slug}`}>
                <a>
                  <p className="text-xl font-semibold text-gray-700 hover:text-gray-500 hover:underline">
                    {product.title.substring(0, 50)}
                  </p>
                </a>
              </Link>
              <p className="text-red-600 font-medium my-2">
                Giá:
                {product.price.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </p>
              <p className="text-red-600 font-medium">
                Tổng tiền:
                {(newQuantity * product.price).toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center mt-4 md:mt-0">
            <input
              value={newQuantity}
              onChange={(e) => {
                if (Number(e.target.value) < 1) return;
                setNewQuantity(e.target.value);
              }}
              type="number"
              name="quantity"
              className="px-4 py-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 w-24"
            />
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 md:pl-6 pl-0 inline-block pt-4">
        <h1 className="w-full text-center font-semibold mx-auto text-2xl text-gray-700 mb-5">
          THÔNG TIN ĐẶT HÀNG
        </h1>
        <form action="POST" onSubmit={onOrder}>
          <div className="">
            <span className="flex mb-5 text-md">
              <span className="bg-indigo-500 w-32 font-semibold text-center text-white p-2 px-5 rounded-l">
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
              <span className="bg-indigo-500 w-32 font-semibold text-center text-white p-2 px-5 rounded-l">
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
            <span className="text-lg">Địa chỉ cố định:</span>
            <span className="flex mb-5 text-md">
              <select
                value={fixedAddress}
                onChange={handleInput}
                name="fixedAddress"
                className="text-md w-full border rounded-r px-4 py-2 bg-white hover:border-gray-400 focus:outline-none appearance-none"
              >
                <option value="">Lựa chọn</option>
                <option value="Khu du lịch Đồ Sơn, Vạn Hương, Hải Phòng">
                  Khu du lịch Đồ Sơn, Vạn Hương, Hải Phòng
                </option>
                <option value="Cát Bi, Hải An, Hải Phòng">
                  Cát Bi, Hải An, Hải Phòng
                </option>
                <option value="Cát Bà, Cát Hải, Hải Phòng">
                  Cát Bà, Cát Hải, Hải Phòng
                </option>
                <option value="Ốc Thuỷ Dương, 30/262 Lạc Tray">
                  Ốc Thuỷ Dương, 30/262 Lạc Tray
                </option>
                <option value="Lẩu cua đồng 188 Văn Cao">
                  Lẩu cua đồng 188 Văn Cao
                </option>
                <option value="Bánh mỳ cay 37 Đinh Tiên Hoàng">
                  Bánh mỳ cay 37 Đinh Tiên Hoàng
                </option>
                <option value="Bún cá cay 21 Trần Phú">
                  Bún cá cay 21 Trần Phú
                </option>
              </select>
            </span>
            <span className="my-5 w-full text-xl text-red-500 text-md font-semibold">
              Tổng tiền:
              {(newQuantity * product.price).toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
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

export async function getServerSideProps({ params: { slug } }) {
  const product = await getDataAPI(`product/${slug}`);

  return {
    props: { product: { ...product, content: null } },
  };
}

export default TemporaryCart;

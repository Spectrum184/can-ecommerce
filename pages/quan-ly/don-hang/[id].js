import slugify from 'slugify';
import Link from 'next/link';

import { useState, useEffect } from 'react';
import { useCartData } from 'hooks';
import { toastNotify } from 'utils/toast';
import { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { putDataAPI } from 'utils/fetch-data';

const OrderDetail = ({ id }) => {
  const dataCart = useCartData(id);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState();
  const { mutate } = useSWRConfig();
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data && data.user.role !== 'admin') router.push('/');
  }, [data, router]);

  const onDelete = async (product) => {
    if (confirm('Chắc chắn xoá?')) {
      const products = dataCart?.products.filter(
        (p) => p.productId !== product.productId
      );

      const res = await putDataAPI(`cart/${id}`, { products });

      toastNotify(res);
      mutate(`cart/${id}`);
    }
  };

  const handleEditCart = (product) => {
    setProduct(product);
    setShowModal(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const products = dataCart?.products.map((p) => {
      if (p.productId === product.productId) {
        return { ...p, quantity: product.quantity, price: product.price };
      }

      return p;
    });

    console.log(products);

    const res = await putDataAPI(`cart/${id}`, { products });

    toastNotify(res);
    mutate(`cart/${id}`);
    setShowModal(false);
  };

  return (
    <div className="w-full px-0 md:px-10 mt-4 pb-6">
      <p className="w-full mx-auto text-center mb-2 font-bold text-xl">
        {dataCart?.user?._id && (
          <span>
            <span>Đặt bởi: </span>
            <Link href={`/trang-ca-nhan/${dataCart?.user._id}`}>
              <a className="hover:underline cursor-pointer">
                {dataCart?.user.name}
              </a>
            </Link>
          </span>
        )}
      </p>
      <table className="rounded-t-lg w-full font-bold text-base bg-indigo-400 text-gray-800">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-3">Số lượng</th>
            <th className="px-4 py-3">Tên</th>
            <th className="px-4 py-3">Giá</th>
            <th className="px-4 py-3">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {dataCart?.products?.length > 0 &&
            dataCart?.products.map((product) => (
              <tr
                className="bg-gray-100 border-b border-indigo-200"
                key={product.productId}
              >
                <td className="px-4 py-3">{product.quantity}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/san-pham/${slugify(product.name, {
                      replacement: '-',
                      trim: true,
                      lower: true,
                      locale: 'vi',
                    })}`}
                  >
                    <a className="hover:underline hover:text-gray-500 cursor-pointer">
                      {product.name}
                    </a>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  {product.price.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </td>
                <td>
                  <button
                    onClick={() => handleEditCart(product)}
                    className="py-2 px-4 text-white rounded-lg bg-indigo-500 block md:inline-block"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="py-2 px-4 ml-2 text-white rounded-lg bg-red-500 block md:inline-block"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="">
        {showModal && (
          <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div className="bg-white px-16 py-14 rounded-md text-center">
              <h1 className="text-xl mb-4 font-bold text-gray-700">
                Sửa chi tiết đơn
              </h1>
              <form action="POST" onSubmit={onSubmit}>
                <div className="flex my-2">
                  <span className="text-sm border-2 rounded-l w-36 px-4 py-2 bg-gray-300 whitespace-no-wrap">
                    Số lượng:
                  </span>
                  <input
                    value={product.quantity}
                    name="quantity"
                    className="border rounded-r px-4 py-2 w-full"
                    type="number"
                    placeholder="Số lượng"
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        [e.target.name]: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex my-2">
                  <span className="text-sm border-2 w-36 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap">
                    Giá:
                  </span>
                  <input
                    name="price"
                    className="border rounded-r px-4 py-2 w-full"
                    type="text"
                    placeholder="Giá"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        [e.target.name]: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <button
                  type="reset"
                  className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
                  onClick={() => setShowModal(false)}
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                >
                  OK
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  return {
    props: { id },
  };
}

export default OrderDetail;

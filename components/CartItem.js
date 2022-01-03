import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';

import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { patchDataAPI } from 'utils/fetch-data';
import { toastNotify } from 'utils/toast';

const CartItem = ({
  name,
  price,
  image,
  quantity,
  productId,
  setCartData,
  cartId,
}) => {
  const [newQuantity, setNewQuantity] = useState(quantity);
  const slug = slugify(name, {
    replacement: '-',
    trim: true,
    lower: true,
    locale: 'vi',
  });
  const { mutate } = useSWRConfig();

  const handleAddQuantity = (e) => {
    const quantityTmp = Number(e.target.value);

    if (quantityTmp <= 0) return;

    setNewQuantity(quantityTmp);

    setCartData((prev) => {
      const newProducts = prev.products.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: quantityTmp,
          };
        }
        return item;
      });

      return {
        ...prev,
        products: newProducts,
      };
    });
  };

  const handleDelete = async () => {
    const res = await patchDataAPI(`cart/${cartId}`, { productId });

    toastNotify(res);
    mutate('cart');
  };

  return (
    <div className="flex flex-col md:flex-row justify-between w-full border-t border-gray-400 pt-2 my-6 px-0 md:px-4">
      <div className="flex items-center justify-center">
        <div className="p-2 rounded-sm bg-white mr-4">
          <Link href={`/san-pham/${slug}`}>
            <a>
              <div className="relative w-32 h-32 border border-gray-400 rounded-sm">
                <Image
                  src={image}
                  alt={productId}
                  layout="fill"
                  className="object-cover rounded-sm"
                  priority
                ></Image>
              </div>
            </a>
          </Link>
        </div>
        <div className="flex flex-col">
          <Link href={`/san-pham/${slug}`}>
            <a>
              <p className="text-xl font-semibold text-gray-700 hover:text-gray-500 hover:underline">
                {name.substring(0, 50)}
              </p>
            </a>
          </Link>
          <p className="text-red-600 font-medium my-2">
            Giá:
            {price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
          <p className="text-red-600 font-medium">
            Tổng tiền:
            {(newQuantity * price).toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 md:mt-0">
        <input
          value={newQuantity}
          onChange={handleAddQuantity}
          type="number"
          name="quantity"
          className="px-4 py-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 w-24"
        />
        <button
          onClick={handleDelete}
          className="py-2 px-5 ml-2 text-white rounded-sm bg-red-500 hover:bg-red-400 block md:inline-block"
        >
          Xoá
        </button>
      </div>
    </div>
  );
};

export default CartItem;

import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';

import { useState } from 'react';

const CartItem = ({ name, price, image, quantity, productId }) => {
  const [newQuantity, setNewQuantity] = useState(quantity);
  const slug = slugify(name, {
    replacement: '-',
    trim: true,
    lower: true,
    locale: 'vi',
  });

  return (
    <div className="flex flex-col md:flex-row justify-between w-full border-t border-gray-400 pt-2 my-6 px-0 md:px-4">
      <div className="flex items-center justify-center">
        <Link href={`/san-pham/${slug}`}>
          <a>
            <div className="relative w-32 h-32 mr-4 border border-gray-400">
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
        <div className="flex flex-col">
          <Link href={`/san-pham/${slug}`}>
            <a>
              <p className="text-xl font-semibold text-gray-700 hover:text-gray-500">
                {name.substring(0, 50)}
              </p>
            </a>
          </Link>
          <p className="text-red-600 font-medium my-2">Giá: {price}</p>
          <p className="text-red-600 font-medium">
            Số lượng: {newQuantity ? newQuantity : 0}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 md:mt-0">
        <input
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          type="number"
          name="quantity"
          className="px-4 py-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 w-24"
        />
        <button className="py-2 px-5 ml-2 text-white rounded-sm bg-red-500 hover:bg-red-400 block md:inline-block">
          Xoá
        </button>
      </div>
    </div>
  );
};

export default CartItem;

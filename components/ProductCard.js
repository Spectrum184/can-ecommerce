import Image from 'next/image';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

const ProductCard = ({
  images,
  description,
  price,
  salePrice,
  slug,
  sold,
  title,
  likes,
  inStock,
}) => {
  const { data } = useSession();

  return (
    <div className="w-full shadow border p-4">
      <Link href={`/san-pham/${slug}`}>
        <a>
          <div className="relative w-full h-48">
            <Image src={images[0].url} alt="product" layout="fill"></Image>
          </div>
        </a>
      </Link>
      <p className="text-xl my-1 w-full font-semibold m-5 hover:text-gray-700">
        <Link href={`/san-pham/${slug}`}>
          <a>{title}</a>
        </Link>
      </p>
      <div className="flex justify-between text-red-500">
        <span className="text-lg">
          Sale:
          {salePrice.toString().substring(0, salePrice.toString().length - 3)}K
        </span>
        <span className="text-lg">Kho: {inStock}</span>
      </div>
      <div className="flex justify-between text-red-500">
        <span className="text-lg line-through">
          Gía:
          {price.toString().substring(0, price.toString().length - 3)}K
        </span>
        <span className="text-lg">Ưng: {likes.length}</span>
      </div>
      <div className="w-full my-2">{description.substring(0, 110)}...</div>
      <div className="flex justify-between my-2 bottom-2">
        <Link href={`/san-pham/${slug}`}>
          <a className="py-3 px-6 text-white rounded-lg bg-indigo-600 shadow-lg block md:inline-block">
            Xem
          </a>
        </Link>
        <button className="py-3 px-6 text-white rounded-lg bg-purple-500 shadow-lg block md:inline-block">
          Mua
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

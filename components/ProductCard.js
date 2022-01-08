import Image from 'next/image';
import Link from 'next/link';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { postDataAPI } from 'utils/fetch-data';
import { toastNotify } from 'utils/toast';
import { useSWRConfig } from 'swr';

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
  _id,
}) => {
  const { data } = useSession();
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const handleBuyProduct = async () => {
    if (data) {
      const cart = {
        productId: _id,
        quantity: 1,
        name: title,
        price: salePrice === 0 ? price : salePrice,
        image: images[0].url,
      };
      const res = await postDataAPI('cart', cart);

      toastNotify(res);
      mutate('cart');
    } else {
      router.push(`/gio-hang/${slug}`);
    }
  };

  return (
    <div className="w-full shadow border p-4 my-3 md:my-0">
      <Link href={`/san-pham/${slug}`}>
        <a>
          <div className="relative w-full h-48">
            <Image
              src={images[0].url}
              alt="product"
              className="object-cover"
              layout="fill"
              priority
            ></Image>
          </div>
        </a>
      </Link>
      <p
        className="text-xl text-center my-2 w-full uppercase font-semibold hover:text-gray-700"
        style={{ minHeight: '56px' }}
      >
        <Link href={`/san-pham/${slug}`}>
          <a>{title.substring(0, 25)}</a>
        </Link>
      </p>
      <div className="flex justify-between text-red-500">
        <span className="text-lg font-semibold">
          Giá:{' '}
          {salePrice === 0
            ? price.toString().substring(0, price.toString().length - 3)
            : salePrice
                .toString()
                .substring(0, salePrice.toString().length - 3)}
          K
        </span>
        <span className="text-lg font-semibold">Kho: {inStock}</span>
      </div>
      <div className="flex justify-between text-red-500">
        <span className="text-lg font-medium">Đã bán: {sold}</span>
        <span className="text-lg font-medium">
          Ưng:{' '}
          {likes.length > 100 ? likes.length : price.toString().substring(0, 3)}
        </span>
      </div>
      <div className="w-full my-2" style={{ minHeight: '96px' }}>
        {description.substring(0, 100)}...
      </div>
      <div className="flex justify-between my-2 bottom-2">
        <Link href={`/san-pham/${slug}`}>
          <a className="py-2 px-5 text-white rounded-sm bg-indigo-500 hover:bg-indigo-400 block md:inline-block">
            Xem
          </a>
        </Link>
        {data?.user.role === 'admin' ? (
          <Link href={`quan-ly/san-pham/${slug}`}>
            <a className="py-2 px-5 text-white rounded-sm bg-purple-500 hover:bg-purple-400 block md:inline-block">
              Quản lý
            </a>
          </Link>
        ) : (
          <button
            onClick={handleBuyProduct}
            className="py-2 px-5 text-white rounded-sm bg-purple-500 hover:bg-purple-400 block md:inline-block"
          >
            Mua
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

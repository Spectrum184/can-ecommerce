import Image from 'next/image';
import { useRouter } from 'next/router';

import { useState, useEffect, useCallback } from 'react';

const Carousel = () => {
  const [images, setImages] = useState([
    'can-ecommerce/lofi_m31jt2.png',
    'can-ecommerce/133112871_3999586296726475_3809288913763950404_o_luhj2g.jpg',
    'can-ecommerce/133112871_3999586296726475_3809288913763950404_o_luhj2g.jpg',
    'can-ecommerce/wallpaperbetter.com_1280x720_ckvfkt.jpg',
    'can-ecommerce/892c8ebd1bb5826d29be0f9374d424bf_r5ybt5.jpg',
  ]);
  const [imageIndex, setImageIndex] = useState(0);
  const router = useRouter();

  const handleNextImage = useCallback(() => {
    setImageIndex((index) => {
      if (index === 4) return 0;
      return index + 1;
    });
  }, []);

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      handleNextImage();
    }, 5000);

    return () => clearInterval(carouselInterval);
  }, [handleNextImage]);

  const handlePreviousImage = () => {
    setImageIndex((index) => {
      if (index === 0) return 4;
      return index - 1;
    });
  };

  return (
    <div className="w-full mt-3">
      <div className="transition ease-in-out relative rounded-lg h-80 block md:flex items-center bg-gray-100 shadow-xl">
        <div className="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg"></div>
        <Image
          src={images[imageIndex]}
          alt="carousel"
          layout="fill"
          className="rounded-sm object-cover cursor-pointer"
          priority
          onClick={() =>
            router.push(
              `/san-pham/khuyen-mai/${
                imageIndex % 2 === 0 ? 'giam-gia' : 'ban-chay'
              }`
            )
          }
        ></Image>
        <button
          onClick={handlePreviousImage}
          className="absolute opacity-70 top-0 mt-32 left-12 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -ml-6 focus:outline-none focus:shadow-outline"
        >
          <span className="block" style={{ transform: 'scale(-1)' }}>
            &#x279c;
          </span>
        </button>
        <button
          onClick={handleNextImage}
          className="absolute top-0 opacity-70 mt-32 right-12 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -mr-6 focus:outline-none focus:shadow-outline"
        >
          <span className="block" style={{ transform: 'scale(1)' }}>
            &#x279c;
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;

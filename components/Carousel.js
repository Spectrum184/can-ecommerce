import Image from 'next/image';
import cn from 'classnames';

import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';

const Carousel = () => {
  const [images, setImages] = useState([
    'can-ecommerce/lofi_r4o0gz.png',
    'can-ecommerce/Transino_White_C_rqwtel.jpg',
    'can-ecommerce/DHC_jac4ry.jpg',
    'can-ecommerce/S%E1%BB%AFa_r%E1%BB%ADa_m%E1%BA%B7t_Senka_Perfect_Whip_5_na5ztk.jpg',
    'can-ecommerce/Kem_d%C6%B0%E1%BB%A1ng_da_to%C3%A0n_th%C3%A2n_Aloins_Eaude_Cream_S_zuzrzs.jpg',
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
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            'transition-all duration-500 delay-500 ease-in-out relative rounded-lg h-80 items-center bg-gray-100 shadow-xl',
            {
              hidden: imageIndex !== index,
            }
          )}
        >
          <div className="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg"></div>
          <Image
            src={image}
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
      ))}
    </div>
  );
};

export default Carousel;

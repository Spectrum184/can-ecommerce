import Image from 'next/image';
import cn from 'classnames';

import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';

const Carousel = () => {
  const [images, setImages] = useState([
    'can-ecommerce/1senka_sbmqjk.jpg',
    'can-ecommerce/1NIGHT_DIET_TEA_ibfvim.jpg',
    'can-ecommerce/1DHC1_e4ikxx.jpg',
    'can-ecommerce/1TRANSINO-WHITE-C-CLEAR_1_vnxfte.jpg',
    'can-ecommerce/1anessa_ikqhkl.jpg',
  ]);
  const [imageIndex, setImageIndex] = useState(0);
  const router = useRouter();

  const handleNextImage = useCallback(() => {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  }, [images]);

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      handleNextImage();
    }, 5000);

    return () => clearInterval(carouselInterval);
  }, [handleNextImage]);

  const handlePreviousImage = () => {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  };

  return (
    <div className="w-full mt-3 flex flex-wrap">
      <div className="w-full md:w-2/3">
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
              className="rounded-sm md:object-cover object-fill cursor-pointer"
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
      <div className="w-full md:w-1/3 md:pl-3 mt-3 md:mt-0 h-80">
        <div className="grid gap-2 grid-cols-2 grid-rows-2 w-full h-full">
          <span className="relative h-full shadow-sm cursor-pointer">
            <Image
              src="can-ecommerce/Carosel_nho_4_vmhqri.jpg"
              alt="avatar"
              layout="fill"
              className="object-cover"
              priority
            />
          </span>
          <span className="w-full relative h-full shadow-sm cursor-pointer">
            <Image
              src="can-ecommerce/Carosel_nho_3_mvhwfq.jpg"
              alt="avatar"
              layout="fill"
              className="object-cover"
              priority
            />
          </span>
          <span className="w-full relative h-full shadow-sm cursor-pointer">
            <Image
              src="can-ecommerce/Carosel_nho_2_mngipf.jpg"
              alt="avatar"
              layout="fill"
              className="object-cover"
              priority
            />
          </span>
          <span className="w-full relative h-full shadow-sm cursor-pointer">
            <Image
              src="can-ecommerce/Carosel_nho_1_s2jwge.jpg"
              alt="avatar"
              layout="fill"
              className="object-cover"
              priority
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

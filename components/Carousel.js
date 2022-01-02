import Image from 'next/image';

import { useState, useEffect, useCallback } from 'react';

const Carousel = () => {
  const [images, setImages] = useState([
    'can-ecommerce/26011398180_97d7ef9b16_b_ungjxw.jpg',
    'can-ecommerce/26218004721_1c563a2a86_b_kgznfw.jpg',
    'can-ecommerce/50101150008_8b69e404f9_b_virto7.jpg',
    'can-ecommerce/van_tho_plxpax.jpg',
  ]);

  const handleNextImage = useCallback(() => {
    setImageIndex((index) => {
      if (index === 3) return 0;
      return index + 1;
    });
  }, []);

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      handleNextImage();
    }, 5000);

    return () => clearInterval(carouselInterval);
  }, [handleNextImage]);

  const [imageIndex, setImageIndex] = useState(0);

  const handlePreviousImage = () => {
    setImageIndex((index) => {
      if (index === 0) return 3;
      return index - 1;
    });
  };

  return (
    <div className="w-full mt-3">
      <div className="relative rounded-lg h-80 block md:flex items-center bg-gray-100 shadow-xl">
        <div className="transition ease-in-out relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg"></div>
        <Image
          src={images[imageIndex]}
          alt="carousel"
          layout="fill"
          className="rounded-sm"
          priority
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

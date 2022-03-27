import React from 'react';
import Product from 'models/productModel';
import ProductCard from 'components/ProductCard';
import Skeleton from 'components/Skeleton';
import { connectDB } from 'utils/connect-db';

const Tag = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-0 w-full">
      {products.length > 0
        ? products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))
        : [0, 1, 2, 3].map((index) => <Skeleton key={index} />)}
    </div>
  );
};

export async function getServerSideProps({ params: { tag } }) {
  connectDB();
  const products = await Product.find({
    tags: {
      $regex: tag,
      $options: 'i',
    },
  }).select('-content');

  return {
    props: {
      products: products.length > 0 ? JSON.parse(JSON.stringify(products)) : [],
    },
  };
}

export default Tag;

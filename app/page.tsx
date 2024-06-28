// @@@SNIPSTART typescript-next-oneclick-page-start
'use client'
import Head from 'next/head';
import React, { useState, useRef } from 'react';
import { v4 as uuid4 } from 'uuid';
// @@@SNIPEND

// @@@SNIPSTART typescript-next-oneclick-page-vars

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: string;
  };
}

const products = [
  {
    id: 1,
    name: 'PDF Book',
    price: '$49',
  },
  {
    id: 2,
    name: 'Kindle Book',
    price: '$49',
  },
];

type ITEMSTATE = 'NEW' | 'ORDERING' |  'ORDERED' | 'ERROR';
// @@@SNIPEND

// @@@SNIPSTART typescript-next-oneclick-page-product
const Product: React.FC<ProductProps> = ({ product }) => {
  const itemId = product.id;
  const [state, setState] = useState<ITEMSTATE>('NEW');
  const [transactionId, setTransactionId] = React.useState(uuid4());

  const buyProduct = () => {
    setState('ORDERING');
    fetch('/api/startBuy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, transactionId }),
    })
      .then(() => {
        setState('ORDERED');
      })
      .catch(() => {
        setState('ERROR');
      });
  };

  const buyStyle = "w-full bg-white hover:bg-blue-200 bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md text-sm font-medium text-gray-900 text-center";
  const orderingStyle = "w-full bg-yellow-500 bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md text-sm font-medium text-gray-900 text-center";
  const orderStyle = "w-full bg-green-500 bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md text-sm font-medium text-gray-900 text-center";
  const errorStyle = "w-full bg-white hover:bg-blue-200 bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md text-sm font-medium text-gray-900 text-center";

  return (
    <div key={product.id} className="relative group">
      <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </div>
      <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
        <div className="flex items-end p-4" aria-hidden="true">
          {
            {
              NEW:     ( <button onClick={buyProduct} className={buyStyle}> Buy Now </button> ),
              ORDERING: ( <div className={orderingStyle}>Orderering</div> ),
              ORDERED: ( <div className={orderStyle}>Ordered</div> ),
              ERROR:   ( <button onClick={buyProduct} className={errorStyle}>Error! Click to Retry </button> ),
            }[state]
          }
        </div>
      </div>
    </div>
  );
};
// @@@SNIPEND

// @@@SNIPSTART typescript-next-oneclick-page-productlist
const ProductList: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 md:grid-cols-4">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
// @@@SNIPEND

// @@@SNIPSTART typescript-next-oneclick-page-home
const Home: React.FC = () => {
  return (
    <div className="pt-8 pb-80 sm:pt-12 sm:pb-40 lg:pt-24 lg:pb-48">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
        <Head>
          <title>Temporal + Next.js One-Click Purchase</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="relative overflow-hidden">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              Temporal.io + Next.js One Click Purchase
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Click on the item to buy it now.
            </p>
          </div>
        </header>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
// @@@SNIPEND

import Head from 'next/head';
import Image from 'next/image';

import { useCategory } from 'hooks';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { imageUpload } from 'utils/image-upload';
import { getDataAPI, postDataAPI, putDataAPI } from 'utils/fetch-data';
import { toastNotify } from 'utils/toast';

const ProductManager = () => {
  const initialState = useMemo(() => {
    return {
      title: '',
      price: 0,
      salePrice: 0,
      description: '',
      content: '',
      category: '',
      inStock: 0,
    };
  }, []);
  const router = useRouter();
  const categories = useCategory();

  const [onEdit, setOnEdit] = useState(false);
  const [images, setImages] = useState([]);
  const { id } = router.query;
  const [product, setProduct] = useState(initialState);
  const { title, price, salePrice, description, category, content, inStock } =
    product;
  const { data } = useSession();

  useEffect(() => {
    if (data && data.user.role !== 'admin') router.push('/');
  }, [data, router]);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getDataAPI(`product/${id}`).then((res) => {
        setProduct(res);
        setImages(res.images);
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages([]);
    }
  }, [id, initialState]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({ ...product, [name]: value });
  };

  const handleUploadImage = (e) => {
    let newArrImages = [];
    let number = 0;
    let error = '';

    const files = [...e.target.files];

    if (files.length === 0) return toast.error('Vui lòng chọn ảnh!');

    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (error = 'Dung lượng ảnh tối đa 1MB!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return (error = 'Định dạng ảnh sai.');

      number += 1;
      if (number <= 5) newArrImages.push(file);
      return newArrImages;
    });

    if (error) return toast.error(error);

    const imgCount = images.length;
    if (imgCount + newArrImages.length > 5)
      return toast.error('Chọn tối đa 5 ảnh!');

    setImages([...images, ...newArrImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === 'all' ||
      images.length === 0
    )
      return toast.error('Vui lòng điền tất cả các phần!');

    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    let res;

    if (onEdit) {
      res = await putDataAPI(`product/${product._id}`, {
        ...product,
        images: [...imgOldURL, ...media],
      });
    } else {
      res = await postDataAPI('product', {
        ...product,
        images: [...imgOldURL, ...media],
      });
    }

    toastNotify(res);
    if (res.message) {
      setImages([]);
      setProduct(initialState);
    }
  };

  return (
    <div>
      <p className="text-2xl mx-auto text-center font-bold m-5 w-full">
        Quản lý sản phẩm
      </p>
      <Head>
        <title>Quản lý sản phẩm</title>
      </Head>
      <div className="flex">
        <div className="w-1/2 p-2">
          <form action="POST" onSubmit={onSubmit}>
            <div className="flex w-full">
              <span className="text-md border rounded-l px-4 py-2 bg-indigo-400 min-w-fit">
                Tên sản phẩm:
              </span>
              <input
                name="title"
                className="border rounded-r px-4 py-2 outline-none flex-1"
                type="text"
                placeholder="Khoảng 25-30 chữ"
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className="flex w-full my-5 justify-between">
              <div className="flex">
                <span className="text-md border rounded-l px-4 py-2 bg-indigo-400 min-w-fit">
                  Giá:
                </span>
                <input
                  name="price"
                  className="border rounded-r px-4 py-2 outline-none w-40"
                  type="number"
                  placeholder="Giá bán..."
                  value={price}
                  onChange={handleChange}
                />
              </div>
              <div className="flex">
                <span className="text-md border rounded-l px-4 py-2 bg-indigo-400 min-w-fit">
                  Giá giảm:
                </span>
                <input
                  name="salePrice"
                  className="border rounded-r px-4 py-2 outline-none w-40"
                  type="number"
                  placeholder="Giá giảm..."
                  value={salePrice}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex w-full my-5">
              <textarea
                className="w-full border p-2"
                name="description"
                value={description.substring(0, 200)}
                onChange={handleChange}
                placeholder="Mô tả khoảng 100 chữ, tối đa 200 chữ"
                rows={4}
              ></textarea>
            </div>
            <div className="flex w-full my-5">
              <textarea
                className="w-full border p-2"
                name="content"
                value={content}
                onChange={handleChange}
                placeholder="Nội dung sản phẩm..."
                rows={7}
              ></textarea>
            </div>
            <p className="w-full text-red-500">
              Vào link bên dưới, copy nội dung bên trái, chỉnh sửa theo ý sau đó
              quay lại và dán vào ô nội dung
              <a
                href="https://zenoamaro.github.io/react-quill/"
                target="_blank"
                rel="noreferrer"
                className="ml-2 underline hover:text-red-300"
              >
                Link
              </a>
            </p>
            <div className="flex w-full my-5 justify-between">
              <div className="flex">
                <span className="text-md border rounded-l px-4 py-2 bg-indigo-400 min-w-fit">
                  Danh mục:
                </span>
                <select
                  value={category}
                  onChange={handleChange}
                  name="category"
                  className="text-md border rounded-r w-60 px-4 py-2 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                >
                  <option value="all">Lựa chọn</option>
                  {categories?.length > 0 &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex">
                <span className="text-md border rounded-l px-4 py-2 bg-indigo-400 min-w-fit">
                  Kho:
                </span>
                <input
                  name="inStock"
                  className="border rounded-r px-4 py-2 outline-none w-40"
                  type="number"
                  placeholder="Số lượng..."
                  value={inStock}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="my-5">
              <button className="py-2 px-6 rounded bg-indigo-400 hover:bg-indigo-300 block md:inline-block">
                {onEdit ? 'Chỉnh sửa' : 'Tạo mới'}
              </button>
            </div>
          </form>
        </div>
        <div className="flex-1 p-2">
          <div className="flex w-full">
            <span className="text-md border rounded-l px-4 py-2 bg-indigo-400 min-w-fit">
              Tải ảnh:
            </span>
            <input
              name="image"
              className="border rounded-r px-4 py-2 outline-none flex-1 cursor-pointer"
              type="file"
              placeholder="Vui lòng chọn ảnh..."
              multiple
              accept="image/*"
              onChange={handleUploadImage}
            />
          </div>
          <div className="w-full mt-3 flex flex-wrap">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative first-of-type:w-full first-of-type:h-96 w-1/4 my-3 h-24 px-2"
              >
                <div className="relative w-full h-full cursor-pointer">
                  <Image
                    src={image.url ? image.url : URL.createObjectURL(image)}
                    alt="image"
                    layout="fill"
                    priority
                    className="z-10 object-cover"
                  ></Image>
                </div>

                <span
                  className="z-10 absolute w-6 h-6 text-center text-red-500 bg-white border cursor-pointer border-red-500 top-0 right-2 rounded-full"
                  onClick={() => deleteImage(index)}
                >
                  &#10005;
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;

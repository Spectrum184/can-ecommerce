import Head from 'next/head';

import { useState, useEffect } from 'react';
import { deleteDataAPI, patchDataAPI, postDataAPI } from 'utils/fetch-data';
import { useCategory } from 'hooks';
import { toastNotify } from 'utils/toast';
import { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Setting = () => {
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [category, setCategory] = useState();
  const categories = useCategory();
  const { mutate } = useSWRConfig();
  const { data } = useSession();
  const router = useRouter();
  const [newCategories, setNewCategories] = useState([]);

  useEffect(() => {
    if (categories) {
      const arrTmp = [];
      for (const key in categories) {
        if (Object.hasOwnProperty.call(categories, key)) {
          const element = categories[key];

          arrTmp.push(...element);
        }
      }

      setNewCategories(arrTmp);
    }
  }, [categories]);

  useEffect(() => {
    if (data && data.user.role !== 'admin') router.push('/');
  }, [data, router]);

  const onSubmitCategory = async (e) => {
    e.preventDefault();

    let res;

    if (category?._id) {
      res = await patchDataAPI(`category/${category._id}`, category);
    } else {
      res = await postDataAPI('category', category);
    }

    toastNotify(res);
    mutate('category');
    setCategory();
    setShowModalCategory(false);
  };

  const handleEditCategory = (category) => {
    setCategory(category);
    setShowModalCategory(true);
  };

  const deleteCategory = async (category) => {
    if (confirm('Bạn có chắc chắn xoá k?')) {
      const res = await deleteDataAPI(`category/${category._id}`);

      toastNotify(res);
      mutate('category');
    }
  };

  return (
    <div className="flex">
      <Head>
        <title>Cài đặt trang</title>
      </Head>
      <div className="w-1/2 p-2">
        <p className="text-2xl text-center font-bold m-5">Danh mục</p>
        <button
          onClick={() => setShowModalCategory(true)}
          className="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black "
        >
          Thêm mới
        </button>
        <table className="rounded-t-lg mt-2 w-full bg-indigo-300 text-gray-800">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Danh mục</th>
              <th className="px-4 py-3">Hoạt động</th>
            </tr>
          </thead>
          <tbody>
            {newCategories?.length > 0 &&
              newCategories.map((category) => (
                <tr
                  className="bg-gray-100 border-b border-indigo-200"
                  key={category._id}
                >
                  <td className="px-4 py-3">{category.name}</td>
                  <td className="px-4 py-3">{category.slug}</td>
                  <td className="px-4 py-3">{category?.category}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-indigo-400"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="bg-red-500 ml-2 text-white px-4 py-2 border rounded-md hover:bg-red-400"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-1/2 flex-1">
        <h2>Thay đổi banner!</h2>
      </div>
      {showModalCategory && (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <div className="bg-white px-16 py-14 rounded-md text-center">
            <h1 className="text-xl mb-4 font-bold text-gray-700">
              Cài đặt danh mục
            </h1>
            <form action="POST" onSubmit={onSubmitCategory}>
              <div className="flex my-2">
                <span className="text-sm border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap">
                  Tên:
                </span>
                <input
                  name="name"
                  className="border rounded-r px-4 py-2 w-full"
                  type="text"
                  placeholder="Tên danh mục"
                  value={category ? category.name : ''}
                  onChange={(e) =>
                    setCategory({ ...category, name: e.target.value })
                  }
                />
              </div>
              <div className="flex my-2">
                <span className="text-sm border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap">
                  Danh mục:
                </span>
                <select
                  value={category ? category?.category : '0'}
                  onChange={(e) =>
                    setCategory({ ...category, category: e.target.value })
                  }
                  name="category"
                  className="text-md border rounded-r w-60 px-4 py-2 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                >
                  <option value="0">Chọn</option>
                  <option value="1">Cao cấp</option>
                  <option value="2">Mỹ phẩm</option>
                  <option value="3">Không có gì để mặc</option>
                  <option value="4">Em đói</option>
                  <option value="5">Phụ kiện</option>
                </select>
              </div>
              <button
                type="reset"
                onClick={() => {
                  setShowModalCategory(false);
                  setCategory();
                }}
                className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
              >
                Huỷ
              </button>
              <button
                type="submit"
                className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
              >
                OK
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;

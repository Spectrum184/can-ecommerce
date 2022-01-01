import { useState } from 'react';

const Setting = () => {
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [category, setCategory] = useState();

  const onSubmitCategory = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex">
      <div className="w-1/2 p-2">
        <p className="text-2xl text-center font-bold m-5">Danh mục</p>
        <button
          onClick={() => setShowModalCategory(true)}
          className="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black "
        >
          Thêm mới
        </button>
        <table className="rounded-t-lg mt-2 w-full bg-indigo-300 text-gray-800">
          <tr className="text-left border-b-2 border-gray-300">
            <th className="px-4 py-3">Tên</th>
            <th className="px-4 py-3">Slug</th>
            <th className="px-4 py-3">Hoạt động</th>
          </tr>
          <tr className="bg-gray-100 border-b border-indigo-200">
            <td className="px-4 py-3">Jill</td>
            <td className="px-4 py-3">Smith</td>
            <td className="px-4 py-3">
              <button className="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-indigo-400">
                Sửa
              </button>
              <button className="bg-red-500 ml-2 text-white px-4 py-2 border rounded-md hover:bg-red-400">
                Xoá
              </button>
            </td>
          </tr>
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
              <div className="flex">
                <span className="text-sm border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap">
                  Tên:
                </span>
                <input
                  name="name"
                  className="border rounded-r px-4 py-2 w-full"
                  type="text"
                  placeholder="Tên danh mục"
                />
              </div>
              <div className="flex my-2">
                <span className="text-sm border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap">
                  Slug:
                </span>
                <input
                  name="slug"
                  className="border rounded-r px-4 py-2 w-full"
                  type="text"
                  placeholder="Đường dẫn"
                />
              </div>
              <button
                type="reset"
                onClick={() => setShowModalCategory(false)}
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

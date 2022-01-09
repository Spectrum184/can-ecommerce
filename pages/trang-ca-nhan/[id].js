import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';
import Pagination from 'components/Pagination';

import { getDataAPI, patchDataAPI } from 'utils/fetch-data';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { imageUpload } from 'utils/image-upload';
import { toastNotify } from 'utils/toast';
import { registerValidate } from 'utils/validate';
import { useDataCartUser } from 'hooks';

const Profile = ({ user, id }) => {
  const initialState = {
    avatar: '',
    name: '',
    password: '',
    confirmPassword: '',
    createdAt: '',
    _id: '',
    username: '',
    email: '',
  };

  const { data } = useSession();
  const [dataUser, setDataUser] = useState(initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const cartData = useDataCartUser({
    userId: id,
    limit: 16,
    page: currentPage,
  });

  const {
    avatar,
    name,
    password,
    confirmPassword,
    _id,
    username,
    createdAt,
    email,
  } = dataUser;

  useEffect(() => {
    if (!user.error) {
      setDataUser({ ...user, confirmPassword: '', password: '', avatar: '' });
    }
  }, [user]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setDataUser({ ...dataUser, [name]: value });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error('Bạn chưa chọn file');

    if (file.size > 1024 * 1024) return toast.error('File không được quá 1 mb');

    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
      return toast.error('Định dạng file không đúng');

    setDataUser({ ...dataUser, avatar: file });
  };

  if (user.error)
    return (
      <div className="w-full px-0 md:px-10 mt-4 block md:flex pb-6">
        <h1 className="w-full text-center font-semibold mx-auto text-2xl text-gray-700">
          KHÔNG TỒN NGƯỜI DÙNG NÀY
        </h1>
      </div>
    );

  const onSubmit = async (e) => {
    e.preventDefault();

    let media;

    const error = registerValidate({
      username,
      name,
      email,
      password,
      confirmPassword,
    });

    if (error) return toast.error(error);

    if (avatar) media = await imageUpload([avatar]);

    const res = await patchDataAPI(`user/${_id}`, {
      ...dataUser,
      avatar: media ? media[0].url : user.avatar,
    });

    toastNotify(res);
  };

  return (
    <div className="w-full px-0 md:px-10 pb-6 mt-4 flex flex-wrap">
      <Head>
        <title>Trang cá nhân</title>
      </Head>
      <div className="w-full md:w-3/12">
        <div className="bg-white p-3 border-t-4 border-indigo-400">
          <div className="w-full h-64 overflow-hidden relative">
            <Image
              src={avatar ? URL.createObjectURL(avatar) : user.avatar}
              alt="avatar"
              layout="fill"
              className="object-cover"
              priority
            ></Image>
            {data?.user._id === _id && (
              <span className="absolute bottom-0 h-10 w-full cursor-pointer">
                <input
                  className="w-full h-full cursor-pointer absolute opacity-0"
                  type="file"
                  name="file"
                  id="file_up"
                  accept="image/*"
                  onChange={changeAvatar}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-slate-100 bottom-2 absolute right-1/2 hover:text-indigo-500 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </span>
            )}
          </div>

          <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
            {username}
          </h1>
          <h3 className="text-gray-600 font-lg text-semibold leading-6">
            Email: {email}
          </h3>
          <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li className="flex items-center py-3">
              <span>Ngày tham gia:</span>
              <span className="ml-auto">{createdAt.substring(0, 10)}</span>
            </li>
            <form action="" method="POST" onSubmit={onSubmit}>
              <li className="flex items-center py-3">
                <span className="mr-2 w-32">Tên</span>
                {data?.user._id === _id ? (
                  <span className="ml-auto">
                    <input
                      autoComplete="off"
                      name="name"
                      value={name}
                      className="border rounded-r px-2 py-2 w-full"
                      onChange={handleChangeInput}
                    />
                  </span>
                ) : (
                  <span className="ml-auto">{name}</span>
                )}
              </li>
              {data?.user._id === _id && (
                <>
                  <li className="flex items-center py-3">
                    <span className="mr-2 w-32">Mật khẩu:</span>
                    <span className="ml-auto">
                      <input
                        autoComplete="password"
                        name="password"
                        type="password"
                        value={password}
                        className="border rounded-r px-2 py-2 w-full"
                        onChange={handleChangeInput}
                      />
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span className="mr-2 w-32">Xác nhận:</span>
                    <span className="ml-auto">
                      <input
                        autoComplete="new-password"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        className="border rounded-r px-2 py-2 w-full"
                        onChange={handleChangeInput}
                      />
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <button className="py-2 px-5 w-full text-white rounded-sm bg-indigo-500 hover:bg-red-400 block md:inline-block">
                      Cập nhật
                    </button>
                  </li>
                </>
              )}
            </form>
          </ul>
        </div>
      </div>
      <div className="w-full md:w-9/12 px-0 md:px-8 md:mt-0 mt-7 pb-4 md:pb-0">
        <table className="rounded-t-lg w-full font-bold text-base bg-indigo-500 text-gray-800">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {cartData?.carts.length > 0 &&
              cartData.carts.map((cart) => (
                <tr
                  className="bg-gray-100 border-b border-indigo-200"
                  key={cart._id}
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/san-pham/${slugify(cart.name, {
                        replacement: '-',
                        trim: true,
                        lower: true,
                        locale: 'vi',
                      })}`}
                    >
                      <a className="hover:underline hover:text-gray-500">
                        {cart.name}
                      </a>
                    </Link>
                  </td>
                  <td className="px-4 py-3">{cart.price}</td>
                  <td className="px-4 py-3">{cart.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {cartData?.total > 1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            totalPage={cartData.total}
          />
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const user = await getDataAPI(`user/${id}`);

  return {
    props: { user, id },
  };
}

export default Profile;

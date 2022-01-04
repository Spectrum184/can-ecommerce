import Head from 'next/head';
import Image from 'next/image';

import { getDataAPI } from 'utils/fetch-data';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Profile = ({ id, user }) => {
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

  console.log(user);
  const { data } = useSession();
  const [dataUser, setDataUser] = useState(initialState);
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
      setDataUser({ ...user, confirmPassword: '', password: '' });
    }
  }, [user]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setDataUser({ ...dataUser, [name]: value });
  };

  const changeAvatar = (e) => {};

  if (user.error)
    return (
      <div className="w-full px-0 md:px-10 mt-4 block md:flex pb-6">
        <h1 className="w-full text-center font-semibold mx-auto text-2xl text-gray-700">
          KHÔNG TỒN NGƯỜI DÙNG NÀY
        </h1>
      </div>
    );

  console.log(dataUser);

  return (
    <div className="w-full px-0 md:px-10 pb-6 mt-4">
      <Head>
        <title>Trang cá nhân</title>
      </Head>
      <div className="w-full md:w-3/12 md:mx-2">
        <div className="bg-white p-3 border-t-4 border-indigo-400">
          <div className="w-full h-64 overflow-hidden relative">
            <Image
              src={avatar ? avatar : user.avatar}
              alt="avatar"
              layout="fill"
              className="object-cover"
              priority
            ></Image>
            <span className="absolute bottom-2 w-full cursor-pointer mx-auto text-center h-6 opacity-30 bg-gray-400">
              <span className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
              <input
                className="w-full h-full bottom-2"
                type="file"
                name="file"
                id="file_up"
                accept="image/*"
                onChange={changeAvatar}
              />
            </span>
          </div>
          <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
            {username}
          </h1>
          <h3 className="text-gray-600 font-lg text-semibold leading-6">
            Email: {email}
          </h3>
          <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li className="flex items-center py-3">
              <span>Ngày tham gia</span>
              <span className="ml-auto">{createdAt.substring(0, 10)}</span>
            </li>
            <li className="flex items-center py-3">
              <span className="mr-2 w-28">Tên</span>
              {data?.user._id === _id ? (
                <span className="ml-auto">
                  <input
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
                  <span className="mr-2 w-28">Mật khẩu</span>
                  <span className="ml-auto">
                    <input
                      name="password"
                      type="password"
                      value={password}
                      className="border rounded-r px-2 py-2 w-full"
                      onChange={handleChangeInput}
                    />
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span className="mr-2 w-28">Xác nhận</span>
                  <span className="ml-auto">
                    <input
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const user = await getDataAPI(`user/${id}`);

  return {
    props: { id, user },
  };
}

export default Profile;

import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useCategory } from 'hooks';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { data } = useSession();
  const categories = useCategory();

  return (
    <nav className="bg-white shadow w-full md:fixed top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex px-4 items-center relative bg-white">
        <div className="md:py-0 py-4">
          <Link href="/">
            <a className="">
              <Image
                src="can-ecommerce/Logo_zwl5es.jpg"
                alt="logo"
                width={60}
                height={40}
                priority
              ></Image>
            </a>
          </Link>
        </div>
        <ul
          className={cn(
            'md:px-2 z-50 bg-white ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0',
            {
              hidden: !showMenu,
            }
          )}
        >
          <li className="relative navbar-parent">
            <span className="flex justify-between md:inline-flex p-4 bg-white items-center hover:bg-indigo-500 cursor-pointer space-x-2">
              <span>Cao cấp</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-current pt-1"
                viewBox="0 0 24 24"
              >
                <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
              </svg>
            </span>
            <ul className="navbar-child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:shadow-lg md:rounded-b ">
              {categories &&
                categories['1'] &&
                categories['1'].map((item) => (
                  <li key={item._id}>
                    <Link href={`/danh-muc/${item.slug}`}>
                      <a className="flex px-4 py-3 hover:bg-indigo-500">
                        {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
          <li className="relative navbar-parent">
            <span className="flex justify-between md:inline-flex p-4 items-center bg-white hover:bg-indigo-500 cursor-pointer space-x-2">
              <span>Mỹ phẩm</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-current pt-1"
                viewBox="0 0 24 24"
              >
                <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
              </svg>
            </span>
            <ul className="navbar-child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:shadow-lg md:rounded-b ">
              {categories &&
                categories['2'] &&
                categories['2'].map((item) => (
                  <li key={item._id}>
                    <Link href={`/danh-muc/${item.slug}`}>
                      <a className="flex px-4 py-3 hover:bg-indigo-500">
                        {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
          <li className="relative navbar-parent">
            <span className="flex justify-between md:inline-flex p-4 items-center hover:bg-indigo-500 cursor-pointer space-x-2">
              <span>Không có gì để mặc</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-current pt-1"
                viewBox="0 0 24 24"
              >
                <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
              </svg>
            </span>
            <ul className="navbar-child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:shadow-lg md:rounded-b ">
              {categories &&
                categories['3'] &&
                categories['3'].map((item) => (
                  <li key={item._id}>
                    <Link href={`/danh-muc/${item.slug}`}>
                      <a className="flex px-4 py-3 hover:bg-indigo-500">
                        {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
          <li className="relative navbar-parent">
            <span className="flex justify-between md:inline-flex p-4 items-center hover:bg-indigo-500 cursor-pointer space-x-2">
              <span>Em đói</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-current pt-1"
                viewBox="0 0 24 24"
              >
                <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
              </svg>
            </span>
            <ul className="navbar-child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:shadow-lg md:rounded-b ">
              {categories &&
                categories['4'] &&
                categories['4'].map((item) => (
                  <li key={item._id}>
                    <Link href={`/danh-muc/${item.slug}`}>
                      <a className="flex px-4 py-3 hover:bg-indigo-500">
                        {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
          <li className="relative navbar-parent">
            <span className="flex justify-between md:inline-flex p-4 items-center hover:bg-indigo-500 cursor-pointer space-x-2">
              <span>Phụ kiện</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-current pt-1"
                viewBox="0 0 24 24"
              >
                <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
              </svg>
            </span>
            <ul className="navbar-child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:shadow-lg md:rounded-b ">
              {categories &&
                categories['5'] &&
                categories['5'].map((item) => (
                  <li key={item._id}>
                    <Link href={`/danh-muc/${item.slug}`}>
                      <a className="flex px-4 py-3 hover:bg-indigo-500">
                        {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
          <li className="relative navbar-parent">
            {data ? (
              <>
                <div
                  className="flex justify-between md:inline-flex cursor-pointer p-4 items-center hover:bg-indigo-500 space-x-2"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <span className="relative h-7 w-7">
                    <Image
                      src={data.user.avatar}
                      alt="avatar"
                      layout="fill"
                      className="rounded-full object-cover"
                      priority
                    />
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 fill-current pt-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                  </svg>
                </div>
                <ul className="navbar-child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:shadow-lg md:rounded-b ">
                  <li>
                    <Link href={`/trang-ca-nhan/${data.user._id}`}>
                      <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-800 rounded hover:bg-indigo-500 hover:text-white">
                        Trang cá nhân
                      </a>
                    </Link>
                  </li>
                  {data.user.role === 'admin' && (
                    <>
                      <li>
                        <Link href={`/quan-ly/san-pham`}>
                          <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-800 rounded hover:bg-indigo-500 hover:text-white">
                            Sản phẩm
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/quan-ly/dashboard`}>
                          <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-800 rounded hover:bg-indigo-500 hover:text-white">
                            Dashboard
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/quan-ly/thanh-vien`}>
                          <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-800 rounded hover:bg-indigo-500 hover:text-white">
                            Thành viên
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/quan-ly/don-hang`}>
                          <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-800 rounded hover:bg-indigo-500 hover:text-white">
                            Đơn hàng
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/quan-ly/cai-dat">
                          <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-800 rounded hover:bg-indigo-500 hover:text-white">
                            Cài đặt
                          </a>
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <span
                      onClick={() => signOut()}
                      className="transition-colors duration-200 flex px-4 py-3 cursor-pointer hover:bg-indigo-500 hover:text-white"
                    >
                      Đăng xuất
                    </span>
                  </li>
                </ul>
              </>
            ) : (
              <div className="flex md:inline-flex p-4 items-center hover:bg-gray-50">
                <Link href="/dang-nhap">
                  <a className="relative my-1 text-gray-700 md:my-0 hover:text-indigo-500 cursor-pointer">
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
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </a>
                </Link>
              </div>
            )}
          </li>
        </ul>
        <div
          className="ml-auto md:hidden text-gray-500 cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          ) : (
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

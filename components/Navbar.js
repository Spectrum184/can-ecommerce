import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const { data } = useSession();

  return (
    <nav className="bg-white shadow fixed top-0 w-full">
      <div className="container max-w-screen-xl mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <a className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700">
                Brand
              </a>
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
              onClick={() => setShowCategory(!showCategory)}
            >
              {showCategory ? (
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
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={cn('md:flex items-center', {
            hidden: !showCategory,
          })}
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <a
              className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              href="#"
            >
              Home
            </a>
            <a
              className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              href="#"
            >
              Shop
            </a>
            <a
              className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              href="#"
            >
              Contact
            </a>
            <a
              className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              href="#"
            >
              About
            </a>
            <a
              className="relative my-1 text-gray-700 md:ml-4 md:my-0 hover:text-indigo-500"
              href="#"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="absolute top-0 left-0 rounded-full bg-indigo-500 text-white p-1 text-xs"></span>
            </a>
          </div>
          {data ? (
            <div
              className="relative my-1 md:my-0 h-7 w-7"
              onMouseOver={() => setShowMenu(true)}
              onMouseOut={() => setShowMenu(false)}
            >
              <div
                className="relative h-7 w-7 block cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              >
                <Image
                  src={data.user.avatar}
                  alt="avatar"
                  layout="fill"
                  className="rounded-full"
                  priority
                />
              </div>
              <div
                className={cn(
                  'absolute top-5 left-0 md:right-0 md:left-auto w-40 mt-2 py-2 bg-white border rounded shadow-xl',
                  {
                    hidden: !showMenu,
                  }
                )}
              >
                <Link href={`/profile/${data.user._id}`}>
                  <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-indigo-500 hover:text-white">
                    Trang cá nhân
                  </a>
                </Link>
                <hr></hr>
                {data.user.role === 'admin' && (
                  <div>
                    <Link href={`/profile/${data.user._id}`}>
                      <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-indigo-500 hover:text-white">
                        Đăng sản phẩm
                      </a>
                    </Link>
                    <hr></hr>
                    <Link href={`/profile/${data.user._id}`}>
                      <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-indigo-500 hover:text-white">
                        Thành viên
                      </a>
                    </Link>
                    <hr></hr>
                    <Link href={`/profile/${data.user._id}`}>
                      <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-indigo-500 hover:text-white">
                        Đơn hàng
                      </a>
                    </Link>
                    <hr></hr>
                    <Link href="/admin/setting">
                      <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-indigo-500 hover:text-white">
                        Cài đặt
                      </a>
                    </Link>
                    <hr></hr>
                  </div>
                )}
                <div
                  onClick={() => signOut()}
                  className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-indigo-500 hover:text-white cursor-pointer"
                >
                  Đăng xuất
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <a className="relative my-1 text-gray-700 md:my-0 hover:text-indigo-500 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useCategory } from 'hooks';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const { data } = useSession();
  const categories = useCategory();
  const {
    query: { slug },
  } = useRouter();

  return (
    <nav className="bg-white shadow fixed top-0 w-full z-50">
      <div className="container max-w-screen-xl mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <a className="">
                <Image
                  src="can-ecommerce/Logo_2_xc7pmu.jpg"
                  alt="logo"
                  width={40}
                  height={40}
                  priority
                ></Image>
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
          <div className="flex flex-col md:flex-row md:mx-6 w-full">
            {categories?.length > 0 &&
              categories?.map((category) => (
                <Link href={`/danh-muc/${category.slug}`} key={category._id}>
                  <a
                    className={cn(
                      'my-1 text-md font-medium hover:text-indigo-500 md:mx-4 md:my-0',
                      { 'text-indigo-500': category.slug === slug }
                    )}
                  >
                    {category.name}
                  </a>
                </Link>
              ))}
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
                  className="rounded-full object-cover"
                  priority
                />
              </div>
              <div
                className={cn(
                  'absolute z-50 overflow-hidden top-5 left-0 md:right-0 md:left-auto w-40 mt-2 py-2 bg-white border rounded shadow-xl',
                  {
                    hidden: !showMenu,
                  }
                )}
              >
                <Link href={`/trang-ca-nhan/${data.user._id}`}>
                  <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-800 rounded hover:bg-indigo-500 hover:text-white">
                    Trang cá nhân
                  </a>
                </Link>
                <hr></hr>
                {data.user.role === 'admin' && (
                  <div>
                    <Link href={`/quan-ly/san-pham`}>
                      <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-800 rounded hover:bg-indigo-500 hover:text-white">
                        Sản phẩm
                      </a>
                    </Link>
                    <hr></hr>
                    <Link href={`/quan-ly/dashboard`}>
                      <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-800 rounded hover:bg-indigo-500 hover:text-white">
                        Dashboard
                      </a>
                    </Link>
                    <hr></hr>
                    <Link href={`/quan-ly/thanh-vien`}>
                      <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-800 rounded hover:bg-indigo-500 hover:text-white">
                        Thành viên
                      </a>
                    </Link>
                    <hr></hr>
                    <Link href={`/quan-ly/don-hang`}>
                      <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-800 rounded hover:bg-indigo-500 hover:text-white">
                        Đơn hàng
                      </a>
                    </Link>
                    <hr></hr>
                    <Link href="/quan-ly/cai-dat">
                      <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-800 rounded hover:bg-indigo-500 hover:text-white">
                        Cài đặt
                      </a>
                    </Link>
                    <hr></hr>
                  </div>
                )}
                <div
                  onClick={() => signOut()}
                  className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-800 rounded hover:bg-indigo-500 hover:text-white cursor-pointer"
                >
                  Đăng xuất
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import Pagination from 'components/Pagination';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDataUser } from 'hooks';
import { deleteDataAPI, patchDataAPI } from 'utils/fetch-data';
import { toastNotify } from 'utils/toast';
import { useSWRConfig } from 'swr';

const UserManager = () => {
  const router = useRouter();
  const { data } = useSession();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [username, setUsername] = useState('');
  const { mutate } = useSWRConfig();
  const dataUser = useDataUser({
    username,
    limit: 20,
    page: currentPage,
  });

  useEffect(() => {
    if (data && data.user.role !== 'admin') router.push('/');
  }, [data, router]);

  const onSearchUser = (e) => {
    e.preventDefault();

    setUsername(search);
  };

  const deleteUser = async (user) => {
    if (confirm('Chắc chắn xoá?')) {
      const res = await deleteDataAPI(`user/${user._id}`);

      toastNotify(res);

      if (res.message)
        mutate(
          `user/find-user?username=${username}$limit=20&page=${currentPage}`
        );
    }
  };

  const updateVipLevel = async (user, vipLevel) => {
    if (confirm('Ok?')) {
      const res = await patchDataAPI(`user/vipLevel?id=${user._id}`, {
        vipLevel: vipLevel,
      });

      toastNotify(res);

      if (res.message)
        mutate(
          `user/find-user?username=${username}$limit=20&page=${currentPage}`
        );
    }
  };

  console.log(dataUser);

  return (
    <div className="mt-3">
      <div className="w-full md:w-1/3 mx-auto">
        <form action="" onSubmit={onSearchUser}>
          <div className="flex">
            <span className="text-sm border rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap">
              Tên:
            </span>
            <input
              name="field_name"
              className="border rounded-r px-4 py-2 w-full"
              type="text"
              placeholder="Tìm theo tên đăng nhập..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button className="py-2 ml-2 px-4 text-white rounded-lg bg-indigo-500 hover:bg-indigo-400 block md:inline-block">
              Tìm
            </button>
          </div>
        </form>
      </div>
      <div className="w-full mt-3">
        <table className="rounded-t-lg w-full font-bold text-base bg-indigo-400 text-gray-800">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Tên đăng nhập</th>
              <th className="px-4 py-3">Ngày tham gia</th>
              <th className="px-4 py-3">Cấp độ</th>
              <th className="px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {dataUser?.users?.length > 0 &&
              dataUser?.users.map((user) => (
                <tr
                  className="bg-gray-100 border-b border-indigo-200"
                  key={user._id}
                >
                  <td className="px-4 py-3">
                    <Link href={`/trang-ca-nhan/${user._id}`}>
                      <a className="hover:underline hover:text-gray-500">
                        {user.name}
                      </a>
                    </Link>
                  </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3">
                    {user.createdAt.substring(0, 10)}
                  </td>
                  <td>
                    <select
                      value={user.vipLevel}
                      onChange={(e) => {
                        updateVipLevel(user, e.target.value);
                      }}
                    >
                      <option value="Fan cứng">Fan Cứng</option>
                      <option value="Thân thiết">Thân Thiết</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteUser(user)}
                      className="py-2 px-4 ml-2 text-white rounded-lg bg-red-500 block md:inline-block"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>
          {dataUser?.total > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPage={dataUser?.total}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManager;

import Pagination from 'components/Pagination';
import UserRow from 'components/userManagement/UserRow';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDataUser } from 'hooks';

const UserManager = () => {
  const router = useRouter();
  const { data } = useSession();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [username, setUsername] = useState('');
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
                <UserRow key={user._id} {...user} page={currentPage} />
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

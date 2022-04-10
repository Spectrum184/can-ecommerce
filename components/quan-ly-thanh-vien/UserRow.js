import { Link } from 'next/link';
import React, { useState } from 'react';

const UserRow = ({ id, name, email, username, createdAt, vipLevel }) => {
  const [localVipLevel, setLocalVipLevel] = useState(vipLevel);

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

  return (
    <tr className="bg-gray-100 border-b border-indigo-200">
      <td className="px-4 py-3">
        <Link href={`/trang-ca-nhan/${id}`}>
          <a className="hover:underline hover:text-gray-500">{name}</a>
        </Link>
      </td>
      <td className="px-4 py-3">{email}</td>
      <td className="px-4 py-3">{username}</td>
      <td className="px-4 py-3">{createdAt.substring(0, 10)}</td>
      <td>
        <select
          value={localVipLevel}
          onChange={(e) => {
            setLocalVipLevel(e.target.value);
            updateVipLevel(user, e.target.value);
          }}
        >
          <option value="CasualUser">Fan Cứng</option>
          <option value="HardcoreUser">Thân Thiết</option>
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
  );
};

export default UserRow;

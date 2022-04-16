import Link from 'next/link';
import { patchDataAPI, deleteDataAPI } from 'utils/fetch-data';
import { toastNotify } from 'utils/toast';
import { useSWRConfig } from 'swr';

import { useState } from 'react';

const UserRow = ({ vipLevel, _id, username, name, email, createdAt, page }) => {
  const { mutate } = useSWRConfig();
  const [localVipLevel, setLocalVipLevel] = useState(vipLevel ?? 'CasualUser');

  const updateVipLevel = async (userID, newVipLevel) => {
    if (confirm('Ok?')) {
      const res = await patchDataAPI(`user/vipLevel?id=${userID}`, {
        vipLevel: newVipLevel,
      });

      toastNotify(res);
      if (res.message)
        mutate(`user/find-user?username=${username}$limit=20&page=${page}`);
    }
  };

  const deleteUser = async (userID) => {
    if (confirm('Chắc chắn xoá?')) {
      const res = await deleteDataAPI(`user/${userID}`);

      toastNotify(res);
      if (res.message)
        mutate(`user/find-user?username=${username}$limit=20&page=${page}`);
    }
  };

  return (
    <tr className="bg-gray-100 border-b border-indigo-200">
      <td className="px-4 py-3">
        <Link href={`/trang-ca-nhan/${_id}`}>
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
            updateVipLevel(_id, e.target.value);
          }}
        >
          <option value="CasualUser">Fan Cứng</option>
          <option value="HardcoreUser">Thân Thiết</option>
          <option value="VIP">VIP</option>
        </select>
      </td>
      <td>
        <button
          onClick={() => deleteUser(_id)}
          className="py-2 px-4 ml-2 text-white rounded-lg bg-red-500 block md:inline-block"
        >
          Xoá
        </button>
      </td>
    </tr>
  );
};

export default UserRow;

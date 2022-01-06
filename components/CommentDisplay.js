import Image from 'next/image';
import Link from 'next/link';

import { useSession } from 'next-auth/react';
import { deleteDataAPI } from 'utils/fetch-data';
import { toastNotify } from 'utils/toast';
import { useSWRConfig } from 'swr';

const CommentDisplay = ({ content, createdAt, user, _id, page, productId }) => {
  const { data } = useSession();
  const { mutate } = useSWRConfig();

  const onDeleteComment = async () => {
    if (confirm('Chắc chắn xoá?')) {
      const res = await deleteDataAPI(`comment/${_id}`);

      toastNotify(res);

      if (res.message)
        mutate(`comment?productId=${productId}&limit=10&page=${page}`);
    }
  };

  return (
    <div className="flex my-4 w-full border rounded-md border-gray-300 p-2">
      <div className="flex-shrink-0 mr-3">
        <Link href={`/trang-ca-nhan/${user._id}`}>
          <a>
            <div className="relative w-20 h-20 rounded-md">
              <Image
                src={user.avatar}
                alt="avatar"
                className="object-cover rounded-md"
                layout="fill"
                priority
              ></Image>
            </div>
          </a>
        </Link>
      </div>
      <div className="flex-1 py-2 px-2 leading-relaxed">
        <strong>
          <Link href={`/trang-ca-nhan/${user._id}`}>
            <a className="hover:underline hover:text-gray-500">{user.name}</a>
          </Link>
        </strong>{' '}
        <span className="text-xs text-gray-400 ml-2">
          {createdAt.substring(0, 10)}
        </span>
        <p className="text-sm">{content}</p>
        {(data?.user?.role === 'admin' || data?.user?._id === user._id) && (
          <span
            onClick={onDeleteComment}
            className="hover:text-red-400 text-red-500 cursor-pointer hover:underline"
          >
            Xoá
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentDisplay;

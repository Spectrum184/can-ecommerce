import { getSession } from 'next-auth/react';

export const adminMiddleware = async (req) => {
  const session = await getSession({ req });
  if (!session) return 'Vui lòng đăng nhập!';

  const { user } = session;

  if (user.role !== 'admin') return 'Bạn không có quyền này!';

  return '';
};

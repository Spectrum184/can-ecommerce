import Pagination from 'components/Pagination';

import { useDataOrder } from 'hooks';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { deleteDataAPI, patchDataAPI } from 'utils/fetch-data';
import { toastNotify } from 'utils/toast';
import { useSWRConfig } from 'swr';

const OrderManager = () => {
  const [findBy, setFindBy] = useState('1');
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useSession();
  const router = useRouter();
  const [order, setOrder] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (data && data.user.role !== 'admin') router.push('/');
  }, [data, router]);

  const dataOrder = useDataOrder({
    type: findBy,
    limit: 20,
    page: currentPage,
  });

  const handleEditOrder = (order) => {
    setOrder(order);
    setShowEditModal(true);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setOrder({ ...order, [name]: value });
  };

  const onDelete = async (order) => {
    if (confirm('Chắc chắn xoá hay không?')) {
      const res = await deleteDataAPI(`order/${findBy}${order._id}`);

      toastNotify(res);
      mutate(`order/find-order?type=${findBy}&limit=20&page=${currentPage}`);
    }
  };

  const showOrderDetail = (order) => {
    let id = '';
    if (findBy === '4') {
      id = findBy + order._id;
    } else {
      id = findBy + order.cart;
    }

    router.push(`/quan-ly/don-hang/${id}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await patchDataAPI(`order/${order._id}`, { ...order, findBy });

    toastNotify(res);
    mutate(`order/find-order?type=${findBy}&limit=20&page=${currentPage}`);
    setShowEditModal(false);
  };

  return (
    <div className="w-full px-0 md:px-10 mt-4 pb-6">
      <div className="flex justify-between w-full items-center h-14 bg-indigo-400 px-4 rounded-t">
        <p className="text-2xl font-bold">Danh sách đơn hàng</p>
        <div className="flex items-center">
          <span className="mr-4 font-bold">Tìm theo:</span>
          <select
            value={findBy}
            onChange={(e) => setFindBy(e.target.value)}
            className="text-medium font-medium rounded border-2 text-gray-800 h-10 pl-3 w-48 bg-white hover:border-gray-400 focus:outline-none appearance-none"
          >
            <option value="1">Chưa xác nhận</option>
            <option value="2">Đã xác nhận</option>
            <option value="3">Tất cả</option>
            <option value="4">Đơn ngoài</option>
          </select>
        </div>
      </div>
      <div className="w-full mt-4">
        <table className="rounded-t-lg w-full font-bold text-base bg-indigo-400 text-gray-800">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-3">Địa chỉ</th>
              <th className="px-4 py-3">Số điện thoại</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Ngày đặt hàng</th>
              <th className="px-4 py-3">Quản lý</th>
            </tr>
          </thead>
          <tbody>
            {dataOrder?.orders.length > 0 &&
              dataOrder.orders.map((order) => (
                <tr
                  className="bg-gray-100 border-b border-indigo-200"
                  key={order._id}
                >
                  <td className="px-4 py-3">
                    <span
                      className="hover:underline hover:text-gray-500 cursor-pointer"
                      onClick={() => showOrderDetail(order)}
                    >
                      {order.address}
                    </span>
                  </td>
                  <td className="px-4 py-3">{order.mobile}</td>
                  <td className="px-4 py-3">{order.status}</td>
                  <td className="px-4 py-3">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditOrder(order)}
                      className="py-2 px-4 text-white rounded-lg bg-indigo-500 block md:inline-block"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => onDelete(order)}
                      className="py-2 px-4 ml-2 text-white rounded-lg bg-red-500 block md:inline-block"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {dataOrder?.total > 1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            totalPage={dataOrder.total}
          />
        )}
      </div>
      {showEditModal && (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <div className="bg-white px-16 py-14 rounded-md text-center">
            <h1 className="text-xl mb-4 font-bold text-gray-700">
              Cài đặt danh mục
            </h1>
            <form action="POST" onSubmit={onSubmit}>
              <div className="flex my-2">
                <span className="text-md border-2 rounded-l w-40 px-4 py-2 bg-gray-300 whitespace-no-wrap">
                  Địa chỉ:
                </span>
                <input
                  name="address"
                  className="border rounded-r px-4 py-2 w-full"
                  type="text"
                  placeholder="địa chỉ"
                  value={order.address}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="flex my-2">
                <span className="text-md border-2 rounded-l w-40 px-4 py-2 bg-gray-300 whitespace-no-wrap">
                  Điện thoại:
                </span>
                <input
                  name="mobile"
                  className="border rounded-r px-4 py-2 w-full"
                  type="text"
                  placeholder="điện thoại"
                  value={order.mobile}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="flex my-2">
                <span className="text-md border-2 rounded-l w-40 px-4 py-2 bg-gray-300 whitespace-no-wrap">
                  Trạng thái:
                </span>
                <input
                  name="status"
                  className="border rounded-r px-4 py-2 w-full"
                  type="text"
                  placeholder="trạng thái"
                  value={order.status}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="flex my-2 items-center">
                <span className="text-md border-2 rounded-l w-40 px-4 py-2 bg-gray-300 whitespace-no-wrap">
                  Hoàn thành:
                </span>
                <input
                  name="status"
                  type="checkbox"
                  className="w-8 h-8 ml-4"
                  placeholder="trạng thái"
                  checked={order.completed ? true : false}
                  onChange={(e) =>
                    setOrder({
                      ...order,
                      completed: e.target.checked ? true : false,
                    })
                  }
                />
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                type="reset"
                className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
              >
                Huỷ
              </button>
              <button
                type="submit"
                className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
              >
                OK
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManager;

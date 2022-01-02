import { toast } from 'react-toastify';

export const toastNotify = (res) => {
  if (res.message) {
    toast.success(res.message);
  } else {
    toast.error(res.error);
  }
};

export const registerValidate = ({
  username,
  name,
  email,
  password,
  confirmPassword,
}) => {
  if (!username || !name || !email || !password)
    return 'Vui lòng nhập tất cả các phần!';

  if (!validateEmail(email)) return 'Vui lòng nhập đúng email!';

  if (password.length < 4) return 'Mật khẩu ít nhất 4 kí tự!';

  if (password !== confirmPassword) return 'Mật khẩu xác nhận không đúng';

  return '';
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validateMobile(mobile) {
  const regex =
    /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;

  return regex.test(mobile);
}

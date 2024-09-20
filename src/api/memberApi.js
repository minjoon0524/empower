import axios from "axios";

const API_SERVER_HOST = `http://localhost:80`;

const host = `${API_SERVER_HOST}`;

export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("username", loginParam.employeeNumber);
  form.append("password", loginParam.pw);

  const res = await axios.post(`${host}/login`, form, header);

  return res.data;
};

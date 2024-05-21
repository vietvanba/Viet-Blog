import axios from "axios";
const endpoint = import.meta.env.VITE_API_URL;
export async function get(url: String) {
  return await axios.get(endpoint + url, {
    headers: { "Content-type": "application/json" },
  });
}
export async function getWithToken(url: String, token: String) {
  return await axios.get(endpoint + url, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
export async function post(url: String, body: any) {
  return await axios.post(endpoint + url, body);
}
export async function postWithToken(url: String, body: any, token: String) {
  return await axios.post(endpoint + url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export async function patchWithToken(url: String, body: any, token: String) {
  return await axios.patch(endpoint + url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export async function patch(url: String, body: any) {
  return await axios.patch(endpoint + url, body);
}
export async function put(url: String, body: any) {
  return await axios.put(endpoint + url, body);
}
export async function del(url: String, token: String) {
  return await axios.delete(endpoint + url, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

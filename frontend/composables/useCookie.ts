import Cookies from "js-cookie";

export function useClientCookie(name: string) {
  // On the client side
  if (process.client) {
    return Cookies.get(name);
  }
}

export function clearAllCookies() {
  // Access the document.cookie string and split it into individual cookies
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const eqPos = cookie.indexOf("="); // Find the start of the cookie value
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie; // Extract the cookie name
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // Set the cookie to expire in the past
  }
}
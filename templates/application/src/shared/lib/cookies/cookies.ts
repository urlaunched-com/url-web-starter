export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1")}=([^;]*)`)
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: string, options: { [key: string]: any } = {}) => {
  const newOptions: { [key: string]: any } = {
    path: "/",
    ...options,
  };

  if (newOptions?.expires instanceof Date) {
    newOptions.expires = newOptions.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  Object.keys(newOptions).forEach(optionKey => {
    updatedCookie += `; ${optionKey}`;
    const optionValue = newOptions[optionKey];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  });

  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
  setCookie(name, "", {
    "max-age": -1,
  });
};

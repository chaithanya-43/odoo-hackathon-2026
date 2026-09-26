export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return Boolean(getToken());
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString();
};

export const formatDateTime = (date) => {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleString();
};
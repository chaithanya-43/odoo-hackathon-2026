const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const text = await response.text();

  let data = {};
  if (text.trim()) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: response.ok, message: text };
    }
  }

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Session expired. Please login again.");
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`
    );
  }

  return data;
}

export const login = (data) =>
  request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const signup = (data) =>
  request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const getProfile = () => {
  const user = localStorage.getItem("user");
  return Promise.resolve({
    success: true,
    data: user ? JSON.parse(user) : {}
  });
};

export const getDashboard = () =>
  request("/api/dashboard");

export const getProducts = (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });

  const suffix = query.toString() ? `?${query}` : "";
  return request(`/api/products${suffix}`);
};

export const getProduct = (id) =>
  request(`/api/products/${id}`);

export const createProduct = (data) =>
  request("/api/products", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const updateProduct = (id, data) =>
  request(`/api/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

export const getReceipts = () =>
  request("/api/receipts");

export const createReceipt = (data) =>
  request("/api/receipts", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const validateReceipt = (id) =>
  request(`/api/receipts/${id}/validate`, {
    method: "POST",
    body: JSON.stringify({})
  });

export const getDeliveries = () =>
  request("/api/deliveries");

export const createDelivery = (data) =>
  request("/api/deliveries", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const validateDelivery = (id) =>
  request(`/api/deliveries/${id}/validate`, {
    method: "POST",
    body: JSON.stringify({})
  });

export const getTransfers = () =>
  request("/api/transfers");

export const createTransfer = (data) =>
  request("/api/transfers", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const validateTransfer = (id) =>
  request(`/api/transfers/${id}/validate`, {
    method: "POST",
    body: JSON.stringify({})
  });

export const getAdjustments = () =>
  request("/api/adjustments");

export const createAdjustment = (data) =>
  request("/api/adjustments", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const validateAdjustment = (id) =>
  request(`/api/adjustments/${id}/validate`, {
    method: "POST",
    body: JSON.stringify({})
  });

export const getLedger = (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });

  const suffix = query.toString() ? `?${query}` : "";
  return request(`/api/ledger${suffix}`);
};

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

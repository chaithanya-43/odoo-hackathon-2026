const API_BASE_URL = '/api'

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

export async function login(credentials) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export async function signup(userData) {
  return request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  })
}

export async function getProfile(token) {
  return request('/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export async function getDashboard() {
  const token = localStorage.getItem("token");

  const response = await fetch("/api/dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to load dashboard."
    );
  }

  return data;
}
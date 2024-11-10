export const BASE_URL = "https://express-mongoose-jwt-app.onrender.com/api";

export const header = {
  token: "",
};

const api_header = (): Headers => {
  const FETCH_HEADER = new Headers();
  FETCH_HEADER.append("Content-Type", "application/json");
  if (header.token) {
    FETCH_HEADER.append("Authorization", `Bearer ${header.token}`);
  }
  return FETCH_HEADER;
};

export { api_header };

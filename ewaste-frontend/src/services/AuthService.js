// src/services/AuthService.js
import axios from "axios";

const API = "http://localhost:8080/api/auth";

export const register = (payload) => axios.post(`${API}/register`, payload);
export const login = (payload) => axios.post(`${API}/login`, payload);

// services/api.js - 기본 API 클라이언트 설정
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // 스프링부트 서버 주소

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - 토큰 추가 등의 작업 수행
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리 등
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 에러 시 로그인 페이지로 리다이렉트 등의 처리
    if (error.response && error.response.status === 401) {
      // 인증 에러 처리
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

// services/boardService.js - 게시판 관련 API 호출
import api from "./api";

// 게시글 목록 조회
export const getAllPosts = (page = 0, size = 10) => {
  return api.get(`/posts?page=${page - 1}&size=${size}`);
};

// 게시글 상세 조회
export const getPost = (id) => {
  return api.get(`/posts/${id}`);
};

// 게시글 생성
export const createPost = (postData) => {
  return api.post("/posts", postData);
};

// 게시글 수정
export const updatePost = (id, postData) => {
  return api.put(`/posts/${id}`, postData);
};

// 게시글 삭제
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

// services/authService.js - 인증 관련 API 호출
import api from "./api";

// 로그인
export const login = (credentials) => {
  return api.post("/auth/login", credentials);
};

// 회원가입
export const register = (userData) => {
  return api.post("/auth/register", userData);
};

// 현재 로그인한 사용자 정보 조회
export const getCurrentUser = () => {
  return api.get("/auth/me");
};

// 로그아웃
export const logout = () => {
  localStorage.removeItem("token");
  // 기타 사용자 관련 저장 데이터 삭제
};

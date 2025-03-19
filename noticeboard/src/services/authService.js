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

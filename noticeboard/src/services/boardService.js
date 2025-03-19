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

// pages/PostFormPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../components/board/PostForm";
import { getPost, createPost, updatePost } from "../services/boardService";

const PostFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(id ? true : false);
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const fetchPost = async () => {
        try {
          const response = await getPost(id);
          setPost(response.data);
        } catch (error) {
          console.error("게시글을 불러오는데 실패했습니다.", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [id, isEdit]);

  const handleSubmit = async (formData) => {
    try {
      if (isEdit) {
        await updatePost(id, { ...formData });
        navigate(`/board/${id}`);
      } else {
        const response = await createPost({
          ...formData,
          author: "사용자", // 실제로는 로그인한 사용자 정보 사용
        });
        navigate(`/board/${response.data.id}`);
      }
    } catch (error) {
      console.error("게시글 저장에 실패했습니다.", error);
    }
  };

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">
            {isEdit ? "게시글 수정" : "새 게시글 작성"}
          </h1>
          <PostForm post={post} onSubmit={handleSubmit} isEdit={isEdit} />
        </div>
      </div>
    </div>
  );
};

export default PostFormPage;

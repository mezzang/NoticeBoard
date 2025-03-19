// pages/PostDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { getPost, deletePost } from "../services/boardService";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPost(id);
        setPost(response.data);
      } catch (error) {
        console.error("게시글을 불러오는데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deletePost(id);
        navigate("/board");
      } catch (error) {
        console.error("게시글 삭제에 실패했습니다.", error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  if (!post) {
    return <div className="text-center py-10">게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

          <div className="flex justify-between text-gray-600 mb-6">
            <div>
              <span>작성자: {post.author}</span>
            </div>
            <div className="space-x-4">
              <span>
                작성일: {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span>조회수: {post.viewCount}</span>
            </div>
          </div>

          <div className="border-t border-b py-6 my-6">
            <div className="whitespace-pre-wrap">{post.content}</div>
          </div>

          <div className="flex justify-between">
            <Link to="/board">
              <Button variant="secondary">목록</Button>
            </Link>
            <div className="space-x-3">
              <Link to={`/board/edit/${post.id}`}>
                <Button>수정</Button>
              </Link>
              <Button variant="danger" onClick={handleDelete}>
                삭제
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;

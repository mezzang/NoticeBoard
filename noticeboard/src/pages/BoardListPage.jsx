// pages/BoardListPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BoardTable from "../components/board/BoardTable";
import Pagination from "../components/board/Pagination";
import Button from "../components/common/Button";
import { getAllPosts, deletePost } from "../services/boardService";

const BoardListPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getAllPosts(currentPage);
        setPosts(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("게시글을 불러오는데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deletePost(id);
        setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.error("게시글 삭제에 실패했습니다.", error);
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">게시판</h1>
        <Link to="/board/new">
          <Button>글쓰기</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-10">로딩 중...</div>
      ) : (
        <>
          <BoardTable posts={posts} onDelete={handleDelete} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default BoardListPage;

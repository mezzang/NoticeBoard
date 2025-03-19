// components/board/BoardTable.jsx
import React from "react";
import { Link } from "react-router-dom";

const BoardTable = ({ posts, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">번호</th>
            <th className="py-3 px-4 text-left">제목</th>
            <th className="py-3 px-4 text-left">작성자</th>
            <th className="py-3 px-4 text-left">작성일</th>
            <th className="py-3 px-4 text-left">조회수</th>
            <th className="py-3 px-4 text-left">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="py-4 px-4">{post.id}</td>
              <td className="py-4 px-4">
                <Link
                  to={`/board/${post.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
              </td>
              <td className="py-4 px-4">{post.author}</td>
              <td className="py-4 px-4">
                {new Date(post.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-4">{post.viewCount}</td>
              <td className="py-4 px-4 space-x-2">
                <Link
                  to={`/board/edit/${post.id}`}
                  className="text-blue-600 hover:underline"
                >
                  수정
                </Link>
                <button
                  onClick={() => onDelete(post.id)}
                  className="text-red-600 hover:underline"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardTable;

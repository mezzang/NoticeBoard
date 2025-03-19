// components/board/PostForm.jsx
import React, { useState, useEffect } from "react";
import Button from "../common/Button";

const PostForm = ({ post, onSubmit, isEdit = false }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          제목
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          required
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          rows="10"
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          variant="secondary"
          type="button"
          onClick={() => window.history.back()}
        >
          취소
        </Button>
        <Button type="submit">{isEdit ? "수정하기" : "등록하기"}</Button>
      </div>
    </form>
  );
};

export default PostForm;

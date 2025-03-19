// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 페이지 컴포넌트 임포트
import BoardListPage from "./pages/BoardListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostFormPage from "./pages/PostFormPage";

// 공통 컴포넌트 임포트
import Header from "./components/common/Header";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="py-6">
          <Routes>
            {/* 게시판 관련 라우트 */}
            <Route path="/" element={<BoardListPage />} />
            <Route path="/board" element={<BoardListPage />} />
            <Route path="/board/:id" element={<PostDetailPage />} />
            <Route path="/board/new" element={<PostFormPage />} />
            <Route path="/board/edit/:id" element={<PostFormPage />} />

            {/* 나중에 추가할 수 있는 다른 페이지 라우트 */}

            {/* 404 페이지 */}
            <Route
              path="*"
              element={
                <div className="text-center py-10">
                  페이지를 찾을 수 없습니다.
                </div>
              }
            />
          </Routes>
        </main>
        <footer className="py-6 text-center text-gray-500">
          <p>© 2025 게시판 CRUD 애플리케이션</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

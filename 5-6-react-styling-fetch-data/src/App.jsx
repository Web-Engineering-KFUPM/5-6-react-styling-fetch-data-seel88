// File: src/App.jsx

import { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import UserModal from "./components/UserModal";
import "./index.css";

export default function App() {
  // State variables (already complete for students)
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  /* =========================================================
     TODO 2.1 — FETCH USERS (Runs once)
     File: src/App.jsx
     ---------------------------------------------------------
     Implement fetch logic inside this useEffect.
     ========================================================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* =========================================================
     TODO 2.2 — FILTER USERS BY NAME
     File: src/App.jsx
     ---------------------------------------------------------
     Implement filtering logic inside this useEffect.
     Dependency array MUST be: [searchTerm, users]
     ========================================================= */
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, users]);

  // Modal handlers (already complete)
  function handleUserClick(user) {
    setSelectedUser(user);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setSelectedUser(null);
  }

  return (
    <div className="app">
      {/* TODO 1.1: Set header className EXACTLY as in lab instructions */}
      <header className="bg-primary text-white py-3 mb-4 shadow">
        <Container>
          <h1 className="h2 mb-0">User Management Dashboard</h1>
          <p className="mb-0 opacity-75">Search users and view details</p>
        </Container>
      </header>

      <Container>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Loading & Error UI (already complete) */}
        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Show list only when not loading and no error */}
        {!loading && !error && (
          <UserList users={filteredUsers} onUserClick={handleUserClick} />
        )}

        <UserModal show={showModal} user={selectedUser} onHide={handleCloseModal} />
      </Container>

      {/* TODO 1.1: Set footer className EXACTLY as in lab instructions */}
      <footer className="bg-light py-4 mt-5">
        <Container>
          <small className="text-muted">SWE 363 — React Lab</small>
        </Container>
      </footer>
    </div>
  );
}
// File: src/components/SearchBar.jsx

import { Form } from "react-bootstrap";

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    // TODO 1.2: EXACT wrapper className
    <div className="mb-4">
      <Form.Control
        type="text"
        placeholder="Search users by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
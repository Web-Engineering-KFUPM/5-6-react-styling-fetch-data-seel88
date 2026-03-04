// File: src/components/UserList.jsx

import { Row, Col, Alert } from "react-bootstrap";
import UserCard from "./UserCard";

export default function UserList({ users, onUserClick }) {
  // TODO 1.3: Empty state
  if (users.length === 0) {
    return (
      <Alert variant="info">
        No users found matching your search criteria.
      </Alert>
    );
  }

  // TODO 1.3: Grid layout
  return (
    <Row>
      {users.map((user) => (
        <Col key={user.id} md={6} lg={4} className="mb-4">
          <UserCard user={user} onUserClick={onUserClick} />
        </Col>
      ))}
    </Row>
  );
}
import React from 'react';
import { Container } from 'react-bootstrap';
import { Toaster } from 'sonner';

const AdminDashboard: React.FC = () => {
  return (
    <Container className="admin-dashboard">
      <h1 className="title">Admin Dashboard</h1>
      <Toaster position="bottom-right" richColors />
    </Container>
  );
};

export default AdminDashboard;

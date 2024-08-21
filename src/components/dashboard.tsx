import React from 'react';
import { Container } from 'react-bootstrap';
import { Toaster } from 'sonner';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5]">
      <Container className="flex flex-col items-center justify-center w-full h-full max-w-lg p-4 bg-[#F5F5F5] rounded-lg shadow-lg">
        <h1 className="text-3xl mb-4 text-center text-[#121212]">Admin Dashboard</h1>
        <Toaster position="bottom-right" richColors />
      </Container>
    </div>
  );
};

export default AdminDashboard;

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Container } from 'react-bootstrap';

const AdminPage = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    // Check if login ID and password match the environment variables
    if (
      loginId === process.env.NEXT_PUBLIC_ADMIN_ID &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      // Redirect to the protected admin area or any other page
      router.push('/admin/dashboard'); // Change this to your actual admin page
    } else {
      setError('Invalid login ID or password');
    }
  };

  return (
    <Container>
      <h1>Admin Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formLoginId">
          <Form.Label>Login ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your login ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {error && <div className="alert alert-danger">{error}</div>}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default AdminPage;

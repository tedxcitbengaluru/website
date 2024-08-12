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

    if (
      loginId === process.env.NEXT_PUBLIC_VIP_ID &&
      password === process.env.NEXT_PUBLIC_VIP_PASS
    ) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid login ID or password');
    }
  };

  return (
    <Container className='mt-5 p-4'>
      <h1>Admin Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formLoginId" className='mt-3' >
          <Form.Label>Login ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your login ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className='mt-3'>
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
        <Button variant="primary" type="submit" className='mt-3'>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default AdminPage;

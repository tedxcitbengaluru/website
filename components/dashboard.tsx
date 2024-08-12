import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Toaster, toast } from 'sonner';

const AdminDashboard: React.FC = () => {
  const [ticketSettings, setTicketSettings] = useState({
    showEarlyBird: false,
    toggleTicketing:false,
    toggleTicketingComplete:false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketSettings = async () => {
      try {
        const response = await fetch('/api/getTicketSettings');
        if (!response.ok) throw new Error('Failed to fetch ticket settings');
        const data = await response.json();
        setTicketSettings(data);
      } catch (err) {
        console.error('Error fetching ticket settings:', err);
        setError('Failed to fetch ticket settings');
      }
    };

    fetchTicketSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTicketSettings(prevSettings => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/saveTicketSettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketSettings),
      });

      if (!response.ok) throw new Error('Failed to save ticket settings');
      toast.success('Ticket settings updated successfully!');
    } catch (err) {
      console.error('Error saving ticket settings:', err);
      toast.error('Failed to save ticket settings');
      setError('Failed to save ticket settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="admin-dashboard">
      <h1 className="title">Admin Dashboard</h1>
      <p className="description">Manage ticketing for the event.</p>

      {error && <Alert variant="danger" className="error-message">{error}</Alert>}

      <Form onSubmit={handleSubmit} className="settings-form">
        <Row className="form-row">
          <Col md={12}>
            <Form.Check
              type="checkbox"
              id="showEarlyBird"
              name="showEarlyBird"
              label="Show Early Bird Ticket"
              checked={ticketSettings.showEarlyBird}
              onChange={handleChange}
              className="form-check"
            />
          </Col>
        </Row>
        <Row className="form-row">
          <Col md={12}>
            <Form.Check
              type="checkbox"
              id="toggleTicketing"
              name="toggleTicketing"
              label="Ticketing"
              checked={ticketSettings.toggleTicketing}
              onChange={handleChange}
              className="form-check"
            />
          </Col>
        </Row>
        <Row className="form-row">
          <Col md={12}>
            <Form.Check
              type="checkbox"
              id="toggleTicketingComplete"
              name="toggleTicketingComplete"
              label="Ticketing Complete"
              checked={ticketSettings.toggleTicketingComplete}
              onChange={handleChange}
              className="form-check"
            />
          </Col>
        </Row>

        <Button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </Button>
      </Form>

      <Toaster position="bottom-right" richColors />
    </Container>
  );
};

export default AdminDashboard;

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container, Image, Row, Col, Modal, Spinner } from 'react-bootstrap';
import { Toaster, toast } from 'sonner';

const RecruitmentPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneno: '',
    dob: '',
    course: '',
    branch: '',
    semester: '',
    aboutYourself: '',
    ahaMoment: '',
    collabQuestion: '',
    whyVolunteer: '',
    experience: '',
    teamSelection: '',
  });

  useEffect(() => {
    const fetchTicketSettings = async () => {
      try {
        const response = await fetch('/api/recruitment-settings');
        const data = await response.json();
        if (response.ok) {
          const initialRecruitmentStatus = data.isRecruitmentEnabled;
          setIsRecruitmentEnabled(data.isRecruitmentEnabled);
        } else {
          console.error('Error fetching ticket settings');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketSettings();
  }, []);

  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isRecruitmentEnabled, setIsRecruitmentEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          paymentScreenshot: reader.result as string,
          paymentScreenshotName: file.name,
        }));
      };
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);
    toast('Submitting the form...');

    const preparedFormData = {
      ...formData,
    };

    try {
      const sheetResponse = await fetch('/api/submitRecruitmentForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preparedFormData),
      });

      if (sheetResponse.ok) {
        toast.success('Form successfully submitted!');
        console.log('Form data successfully submitted to Google Sheets!');
      } else {
        console.error('Error submitting form data');
        toast.error('Error submitting form data');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const title = 'Event Volunteer Recruitment Form';

  if (loading) {
    return (
      <Container className="loading-page">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!isRecruitmentEnabled) {
    return (
      <Container className="not-available-page">
        <h1>Not Available</h1>
        <p>Recruitment is not available at the moment.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5 p-4  rounded shadow-sm">
      <h1 className="mb-5">{title}</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {currentSection === 1 && (
          <>
            <h2 className="mb-4">Section 1</h2>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                    className="form-input"
                    isInvalid={validated && !formData.fullname}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your full name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    isInvalid={validated && !formData.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formPhoneNo">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phoneno"
                    value={formData.phoneno}
                    onChange={handleChange}
                    pattern="^\d{10}$"
                    title="Phone number must be exactly 10 digits."
                    required
                    className="form-input"
                    isInvalid={validated && !formData.phoneno.match(/^\d{10}$/)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Phone number must be exactly 10 digits.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formDob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    isInvalid={validated && !formData.dob}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your date of birth.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="course">
                  <Form.Label>Course</Form.Label>
                  <Form.Control
                    as="select"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="form-select"
                    isInvalid={validated && !formData.course}
                  >
                    <option value="">Select</option>
                    <option value="Btech">Btech</option>
                    <option value="Bcom">Bcom</option>
                    <option value="Mtech">Mtech</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please select a Course.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {(formData.course === "Btech" || formData.course === "Mtech") && (
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group controlId="branch">
                    <Form.Label>Branch</Form.Label>
                    <Form.Control
                      as="select"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                      className="form-select"
                      isInvalid={validated && !formData.branch}
                    >
                      <option value="">Select Branch</option>
                      <option value="CSE">CSE</option>
                      <option value="ISE">ISE</option>
                      <option value="AIML">AIML</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="ME/CV">ME/CV</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please select your department.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formSemester">
                  <Form.Label>Semester</Form.Label>
                  <Form.Control
                    as="select"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    required
                    className="form-select"
                    isInvalid={validated && !formData.semester}
                  >
                    <option value="">Select Semester</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please select your semester.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="danger" onClick={() => setCurrentSection(2)} className="w-100 submit-button">
              Next
            </Button>
          </>
        )}
        {currentSection === 2 && (
          <>
            <h2 className="mb-4">Section 2</h2>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="aboutYourself">
                  <Form.Label>Tell us about yourself, your story.</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    name="aboutYourself"
                    value={formData.aboutYourself}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    onChange={handleChange}
                    required
                    isInvalid={validated && !formData.aboutYourself}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide information about yourself.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="ahaMoment">
                  <Form.Label>Tell us about a triumphant/"aha" moment in your life so far?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    name="ahaMoment"
                    value={formData.ahaMoment}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    onChange={handleChange}
                    required
                    isInvalid={validated && !formData.ahaMoment}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide details about a triumphant moment.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="collabQuestion">
                  <Form.Label>Tell us about a time when you had to collaborate with someone who had a different viewpoint. How did you handle it?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    name="collabQuestion"
                    value={formData.collabQuestion}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    onChange={handleChange}
                    required
                    isInvalid={validated && !formData.collabQuestion}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide details about your collaboration experience.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="whyVolunteer">
                  <Form.Label>
                    Why do you want to become a TEDx volunteer in the team that you choose?
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    name="whyVolunteer"
                    value={formData.whyVolunteer}
                    onChange={handleChange}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    required
                    isInvalid={validated && !formData.whyVolunteer}
                    style={{ overflow: 'hidden' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please explain why you want to be a TEDx volunteer.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="experience">
                  <Form.Label>Do you have any prior TEDx volunteering/any other volunteering experience? If yes, please elaborate.</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    name="experience"
                    value={formData.experience}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    onChange={handleChange}
                    required
                    isInvalid={validated && !formData.experience}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide details about your volunteering experience.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3 justify-content-center">
              <Button
                variant="danger"
                onClick={() => setCurrentSection(1)}
                className="w-25 mx-3 submit-button"
              >
                Previous
              </Button>
              <Button
                variant="danger"
                onClick={() => setCurrentSection(3)}
                className="w-25 mx-3 submit-button"
              >
                Next
              </Button>
            </Row>
          </>
        )}
        {currentSection === 3 && (
          <>
            <h2 className="mb-4">Section 3</h2>
            <Row className="mb-5">
              <Col md={12}>
                <Form.Group controlId="recruitmentroleinfo">
                  <Form.Label>Which Team Would Suit You the Most?</Form.Label>
                  <div className="text-center mt-3">
                    <Image
                      src="/recruitment role.jpg"
                      alt="recruitment roles"
                      className="img-fluid"
                      style={{ maxWidth: '50%' }}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="teamSelection">
                  <Form.Label>Select the team you want to be in!</Form.Label>
                  <Form.Control
                    as="select"
                    name="teamSelection"
                    value={formData.teamSelection}
                    onChange={handleChange}
                    required
                    className="form-select"
                    isInvalid={validated && !formData.teamSelection}
                  >
                    <option value="">Select your Team</option>
                    <option value="Curation Team">Curation Team</option>
                    <option value="Technical Team">Technical Team</option>
                    <option value="Creative Team">Creative Team:</option>
                    <option value="Sponsorship Team">Sponsorship Team</option>
                    <option value="Event Management Team">Event Management Team</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please select your team.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3 justify-content-center">
              <Button
                variant="danger"
                onClick={() => setCurrentSection(2)}
                className="w-25 mx-3 submit-button"
              >
                Previous
              </Button>
              <Button
                variant="danger"
                onClick={() => setCurrentSection(4)}
                className="w-25 mx-3 submit-button"
              >
                Next
              </Button>
            </Row>
          </>
        )}

        {currentSection === 4 && (
          <>
            {formData.teamSelection && (
              <Row className="mb-4">
                <Col md={12}>
                  <h3>{formData.teamSelection}</h3>
                  {formData.teamSelection === 'Curation Team' && (
                    <p>You have selected the Curation Team. Here are the details...</p>
                  )}
                  {formData.teamSelection === 'Technical Team' && (
                    <p>You have selected the Technical Team. Here are the details...</p>
                  )}
                  {formData.teamSelection === 'Creative Team' && (
                    <p>You have selected the Technical Team. Here are the details...</p>
                  )}
                  {formData.teamSelection === 'Sponsorship Team' && (
                    <p>You have selected the Technical Team. Here are the details...</p>
                  )}
                  {formData.teamSelection === 'Event Management Team' && (
                    <p>You have selected the Technical Team. Here are the details...</p>
                  )}
                </Col>
              </Row>
            )}
            <Row className="mb-3 justify-content-center">
              <Button
                variant="danger"
                onClick={() => setCurrentSection(3)}
                className="w-25 mx-3 submit-button"
              >
                Previous
              </Button>
              <Button type="submit" variant="danger" className="w-25 mx-3 submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            </Row>
            
          </>
        )}


      </Form>
      <Toaster position="bottom-right" richColors />
      <Modal show={showConfirmModal} onHide={handleCancel} centered>
        <Modal.Header className='modal-header' closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>Are you sure you want to submit the form?</Modal.Body>
        <Modal.Footer className='modal-footer'>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RecruitmentPage;

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container, Image, Row, Col, Modal } from 'react-bootstrap';
import { Toaster, toast } from 'sonner';

const TicketPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    phoneno: '',
    workStudy: '',
    workStudyCustom: '',
    findUs: '',
    findUsCustom: '',
    department: '',
    semester: '',
    paymentType: '',
    teamMemberName: '',
    upiTransactionId: '',
    paymentScreenshot: '',
    paymentScreenshotName: '',
  });

  const [showWorkStudyCustomField, setShowWorkStudyCustomField] = useState(false);
  const [showFindUsCustomField, setShowFindUsCustomField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    if (name === 'workStudy') {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
        workStudyCustom: value === 'other' ? prevState.workStudyCustom : '',
      }));
      setShowWorkStudyCustomField(value === 'other');
    } else if (name === 'findUs') {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
        findUsCustom: value === 'other' ? prevState.findUsCustom : '',
      }));
      setShowFindUsCustomField(value === 'other');
    } else {
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
    const form = e.currentTarget;
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

    let paymentScreenshotLink = formData.paymentScreenshot;
    let email = formData.email;
    if (paymentScreenshotLink) {
      try {
        const response = await fetch('/api/uploadToGoogleDrive', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: paymentScreenshotLink.split(',')[1],
            fileName:  email,
            mimeType: 'image/jpeg',
          }),
        });

        if (response.ok) {
          const { link } = await response.json();
          paymentScreenshotLink = link;
        } else {
          console.error('Error uploading file to Google Drive');
          toast.error('Error uploading file to Google Drive');
          setIsSubmitting(false);
          return;
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while uploading the file');
        setIsSubmitting(false);
        return;
      }
    }

    const preparedFormData = {
      ...formData,
      workStudy: formData.workStudy === 'other' ? formData.workStudyCustom : formData.workStudy,
      findUs: formData.findUs === 'other' ? formData.findUsCustom : formData.findUs,
      paymentScreenshot: paymentScreenshotLink,
    };

    try {
      const sheetResponse = await fetch('/api/submitToGoogleSheet', {
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

  return (
    <Container className="mt-5 p-4 border rounded shadow-sm bg-white">
      <h1 className="mb-4">Ticket Registration Form</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            <Form.Group controlId="formWorkStudy">
              <Form.Label>Where do you work/study?</Form.Label>
              <Form.Control
                as="select"
                name="workStudy"
                value={formData.workStudy}
                onChange={handleChange}
                required
                className="form-select"
                isInvalid={validated && !formData.workStudy}
              >
                <option value="">Select</option>
                <option value="College">CIT</option>
                <option value="other">Other</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select where you work or study.
              </Form.Control.Feedback>
            </Form.Group>
            {showWorkStudyCustomField && (
              <Form.Group controlId="formWorkStudyCustom" className="mt-3">
                <Form.Label>If other, please specify</Form.Label>
                <Form.Control
                  type="text"
                  name="workStudyCustom"
                  value={formData.workStudyCustom}
                  onChange={handleChange}
                  required
                  className="form-input"
                  isInvalid={validated && formData.workStudy === 'other' && !formData.workStudyCustom}
                />
                <Form.Control.Feedback type="invalid">
                  Please specify if you selected "Other".
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formFindUs">
              <Form.Label>How did you find us?</Form.Label>
              <Form.Control
                as="select"
                name="findUs"
                value={formData.findUs}
                onChange={handleChange}
                required
                className="form-select"
                isInvalid={validated && !formData.findUs}
              >
                <option value="">Select</option>
                <option value="College">College</option>
                <option value="Social Media">Social Media</option>
                <option value="Friends">Friends</option>
                <option value="other">Other</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select how you found us.
              </Form.Control.Feedback>
            </Form.Group>
            {showFindUsCustomField && (
              <Form.Group controlId="formFindUsCustom" className="mt-3">
                <Form.Label>If other, please specify</Form.Label>
                <Form.Control
                  type="text"
                  name="findUsCustom"
                  value={formData.findUsCustom}
                  onChange={handleChange}
                  required
                  className="form-input"
                  isInvalid={validated && formData.findUs === 'other' && !formData.findUsCustom}
                />
                <Form.Control.Feedback type="invalid">
                  Please specify if you selected "Other".
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="form-select"
                isInvalid={validated && !formData.department}
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="ISE">ISE</option>
                <option value="AIML">AIML</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="ME/CV">ME/CV</option>
                <option value="Faculty">Faculty</option>
                <option value="MBA/Commerce/Degree">MBA/Commerce/Degree</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select your department.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

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
                <option value="Alumni">Alumni</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select your semester.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formPaymentType">
              <Form.Label>Payment Type (Mode)</Form.Label>
              <Form.Control
                as="select"
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                required
                className="form-select"
                isInvalid={validated && !formData.paymentType}
              >
                <option value="">Select Payment Mode</option>
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a payment mode.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {formData.paymentType === 'cash' && (
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formTeamMemberName">
                <Form.Label>Team Member Name (Cash received by whom)</Form.Label>
                <Form.Control
                  type="text"
                  name="teamMemberName"
                  value={formData.teamMemberName}
                  onChange={handleChange}
                  required
                  className="form-input"
                  isInvalid={validated && !formData.teamMemberName}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide the team member's name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        )}

        {formData.paymentType === 'upi' && (
          <>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formUpiId">
                  <Form.Label>UPI ID</Form.Label>
                  <Form.Control
                    type="text"
                    value="tedxcit@ybl"
                    readOnly
                    className="form-input bg-light"
                  />
                  <div className="text-center mt-3">
                    <Image
                      src="/upi id.jpeg"
                      alt="UPI QR Code"
                      className="img-fluid"
                      style={{ maxWidth: '50%' }} 
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formExampleTransactions">
                  <Form.Label>Example Transactions</Form.Label>
                  <div className="text-center mt-3">
                    <Image
                      src="/example transaction.jpeg"
                      alt="Example Transactions"
                      className="img-fluid"
                      style={{ maxWidth: '50%' }} 
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formUpiTransactionId">
                  <Form.Label>UPI Transaction ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="upiTransactionId"
                    value={formData.upiTransactionId}
                    onChange={handleChange}
                    required
                    className="form-input"
                    isInvalid={validated && !formData.upiTransactionId}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide the UPI transaction ID.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formPaymentScreenshot">
                  <Form.Label>Screenshot of Payment</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="form-file-input"
                    isInvalid={validated && !formData.paymentScreenshot}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please upload a screenshot of the payment.
                  </Form.Control.Feedback>
                  {formData.paymentScreenshot && (
                    <Image src={formData.paymentScreenshot} alt="Payment Screenshot" fluid className="mt-2" />
                  )}
                </Form.Group>
              </Col>
            </Row>
          </>
        )}

        <Button type="submit" variant="primary" className="mt-4" style={{ backgroundColor: '#EA0021', borderColor: '#EA0021', opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
      <Toaster position="bottom-right" richColors />
      <Modal show={showConfirmModal} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to submit the form?</Modal.Body>
        <Modal.Footer>
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

export default TicketPage;

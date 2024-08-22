import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image, Spinner } from 'react-bootstrap';
import { Toaster, toast } from 'sonner';

interface TeamMember {
  email: string;
  phoneNo: string;
  name: string;
  workStudy: string;
  workStudyCustom: string;
  findUs: string;
  findUsCustom: string;
  department: string;
  semester: string;
  showWorkStudyCustom?: boolean;
  showFindUsCustom?: boolean;
}

const TeamTicketPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [formData, setFormData] = useState({
    paymentType: '',
    teamMemberName: '',
    upiTransactionId: '',
    paymentScreenshot: '',
    paymentScreenshotName: '',
    ticketType: '',
  });

  const [ticketType, setTicketType] = useState('');
  const [showWorkStudyCustomField, setShowWorkStudyCustomField] = useState(false);
  const [showFindUsCustomField, setShowFindUsCustomField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [ticketing, setTicketing] = useState(false);
  const [ticketingComplete, setTicketingComplete] = useState(false);
  const [isEarlyBird, setIsEarlyBird] = useState(false);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTicketSettings = async () => {
      try {
        const response = await fetch('/api/ticket-settings');
        const data = await response.json();
        if (response.ok) {
          const initialTicketType = data.showEarlyBird ? 'Early Bird' : '';
          const initialMemberCount = data.showEarlyBird ? 1 : 0;

          setIsEarlyBird(data.showEarlyBird);
          setTicketing(data.toggleTicketing);
          setTicketingComplete(data.toggleTicketingComplete);
          setTicketType(initialTicketType);
          setCounter(data.counter);

          setTeamMembers(Array(initialMemberCount).fill(null).map(() => ({
            email: '',
            phoneNo: '',
            name: '',
            workStudy: '',
            workStudyCustom: '',
            findUs: '',
            findUsCustom: '',
            department: '',
            semester: '',
          })));
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

  const handleTicketTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setTicketType(selectedType);
    let memberCount = 1;
    if (selectedType === 'Group of 3') {
      memberCount = 3;
    } else if (selectedType === 'Group of 5') {
      memberCount = 5;
    }

    if (isEarlyBird) {
      setTicketType('Early Bird');
      memberCount = 1;
    }

    setTeamMembers(Array(memberCount).fill(null).map(() => ({
      email: '',
      phoneNo: '',
      name: '',
      workStudy: '',
      workStudyCustom: '',
      findUs: '',
      findUsCustom: '',
      department: '',
      semester: '',
    })));
  };

  const handleTeamMemberChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newTeamMembers = [...teamMembers];
    const updatedMember = { ...newTeamMembers[index], [name]: value };

    if (name === 'workStudy') {
      updatedMember.workStudyCustom = value === 'other' ? updatedMember.workStudyCustom : '';
      setShowWorkStudyCustomField(value === 'other');
    } else if (name === 'findUs') {
      updatedMember.findUsCustom = value === 'other' ? updatedMember.findUsCustom : '';
      setShowFindUsCustomField(value === 'other');
    }

    newTeamMembers[index] = updatedMember;
    setTeamMembers(newTeamMembers);
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
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

    let paymentScreenshotLink = formData.paymentScreenshot;
    let upitransactionid = formData.upiTransactionId;
    if (paymentScreenshotLink) {
      try {
        const response = await fetch('/api/uploadToGoogleDrive', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: paymentScreenshotLink.split(',')[1],
            fileName: upitransactionid,
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

    const preparedFormData = teamMembers.map(member => ({
      ...member,
      ...formData,
      paymentScreenshot: paymentScreenshotLink,
      ticketType: ticketType,
    }));

    const newCounter = counter + teamMembers.length;

    try {
      const sheetResponse = await fetch('/api/submitTicketForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preparedFormData),
      });

      if (sheetResponse.ok) {
        const counterUpdateResponse = await fetch('/api/ticket-settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            showEarlyBird: isEarlyBird,
            toggleTicketing: ticketing,
            toggleTicketingComplete: ticketingComplete,
            counter: newCounter,
          }),
        });

        if (counterUpdateResponse.ok) {
          setCounter(newCounter);

          setFormData({
            paymentType: '',
            teamMemberName: '',
            upiTransactionId: '',
            paymentScreenshot: '',
            paymentScreenshotName: '',
            ticketType: '',
          });
          setTeamMembers(Array(isEarlyBird ? 1 : 0).fill(null).map(() => ({
            email: '',
            phoneNo: '',
            name: '',
            workStudy: '',
            workStudyCustom: '',
            findUs: '',
            findUsCustom: '',
            department: '',
            semester: '',
          })));
          setValidated(false);
          toast.success('Form successfully submitted!');
        } else {
          console.error('Error updating counter');
          toast.error('Error updating counter');
        }
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

  const handleExport = () => {
    const dataToExport = {
      teamMembers,
      formData,
      ticketType,
      counter,
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataToExport))}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'formData.json';
    link.click();
  };

  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target?.result as string);
          setTeamMembers(importedData.teamMembers);
          setFormData(importedData.formData);
          setTicketType(importedData.ticketType);
          setCounter(importedData.counter);
          toast.success('Form data imported successfully!');
        } catch (error) {
          toast.error('Failed to import form data');
          console.error('Error parsing imported file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  if (loading) {
    return (
      <Container className="flex items-center justify-center h-[100vh]">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!ticketing) {
    return (
      <Container className="flex items-center justify-center flex-col h-screen">
        <h1 className="text-3xl font-bold mb-4">Not Available</h1>
        <p className="text-lg text-center max-w-md">
          Ticketing for this event is not available at the moment.
        </p>
      </Container>
    );
  }

  if (ticketingComplete) {
    return (
      <Container className="flex items-center justify-center flex-col h-screen">
        <h1 className="text-3xl font-bold mb-4">Sold Out</h1>
        <p className="text-lg text-center max-w-md">All tickets for this event have been sold out.</p>
      </Container>
    );
  }

  const title = isEarlyBird ? 'Early Bird Ticket Registration Form' : `${ticketType === '' ? '' : ticketType === 'Solo' ? 'Solo' : ticketType === 'Group of 3' ? 'Group of 3' : 'Group of 5'} Ticket Registration Form`;

  return (
    <div className=" flex flex-col items-center gap-8 bg-[#121212] py-20">
      <Container className="mt-5 p-4 rounded shadow-sm ">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        {!title.includes('Early Bird') && (
          <Col>
            <Form.Group controlId="formTicketType">
              <Form.Label>Ticket Type</Form.Label>
              <Form.Select as="select" value={ticketType} onChange={handleTicketTypeChange} required>
                <option value="">Select Ticket Type...</option>
                <option value="Solo">Solo</option>
                <option value="Group of 3">Group of 3</option>
                <option value="Group of 5">Group of 5</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a ticket type.
              </Form.Control.Feedback>
            </Form.Group>
            {ticketType !== "Solo" && (
              <Form.Group className="p-5">
                <Form.Label>Import Form</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleImport}
                  required
                />
              </Form.Group>
            )}
          </Col>
        )}
        {ticketType && (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {teamMembers.map((member, index) => (
              <React.Fragment key={index}>
                <Row className="mb-3 mt-4">
                  <Col md={12}>
                    <Form.Group controlId={`formEmail${index}`}>
                      <Form.Label>{ticketType === "Solo" || title.includes("Early Bird")
                        ? "Email"
                        : `Email for Member ${index + 1}`}</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={member.email}
                        onChange={(e) => handleTeamMemberChange(index, e)}
                        required
                        isInvalid={validated && !member.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email address for member {index + 1}.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId={`formPhoneNo${index}`}>
                      <Form.Label> {ticketType === "Solo" || title.includes("Early Bird")
                        ? "Phone Number"
                        : `Phone Number for Member ${index + 1}`}</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phoneNo"
                        value={member.phoneNo}
                        onChange={(e) => handleTeamMemberChange(index, e)}
                        pattern="^\d{10}$"
                        title="Phone number must be exactly 10 digits."
                        required
                        isInvalid={validated && !member.phoneNo.match(/^\d{10}$/)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Phone number for member {index + 1} must be exactly 10 digits.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId={`formName${index}`}>
                      <Form.Label>{ticketType === "Solo" || title.includes("Early Bird")
                        ? "Name"
                        : `Name of Member ${index + 1}`}</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={member.name}
                        onChange={(e) => handleTeamMemberChange(index, e)}
                        required
                        isInvalid={validated && !member.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide the name of member {index + 1}.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId={`formWorkStudy${index}`}>
                      <Form.Label>Where do you work/study?</Form.Label>
                      <Form.Control
                        as="select"
                        name="workStudy"
                        value={member.workStudy}
                        onChange={(e) => handleTeamMemberChange(index, e)}
                        required
                        className="form-select"
                        isInvalid={validated && !member.workStudy}
                      >
                        <option value="">Select</option>
                        <option value="College">CIT</option>
                        <option value="other">Other</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Please select where you work or study.
                      </Form.Control.Feedback>
                    </Form.Group>
                    {member.workStudy === 'other' && (
                      <Form.Group controlId={`formWorkStudyCustom${index}`} className="mt-3">
                        <Form.Label>If other, please specify</Form.Label>
                        <Form.Control
                          type="text"
                          name="workStudyCustom"
                          value={member.workStudyCustom}
                          onChange={(e) => handleTeamMemberChange(index, e)}
                          required
                          className="form-input"
                          isInvalid={validated && member.workStudy === 'other' && !member.workStudyCustom}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please specify if you selected &quot;Other&quot;.
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId={`formFindUs${index}`}>
                      <Form.Label>How did you find us?</Form.Label>
                      <Form.Control
                        as="select"
                        name="findUs"
                        value={member.findUs}
                        onChange={(e) => handleTeamMemberChange(index, e)}
                        required
                        className="form-select"
                        isInvalid={validated && !member.findUs}
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
                    {member.findUs === 'other' && (
                      <Form.Group controlId={`formFindUsCustom${index}`} className="mt-3">
                        <Form.Label>If other, please specify</Form.Label>
                        <Form.Control
                          type="text"
                          name="findUsCustom"
                          value={member.findUsCustom}
                          onChange={(e) => handleTeamMemberChange(index, e)}
                          required
                          className="form-input"
                          isInvalid={validated && member.findUs === 'other' && !member.findUsCustom}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please specify if you selected &quot;Other&quot;.
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Col>
                </Row>

                {member.workStudy !== 'other' && (
                  <>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Form.Group controlId={`formDepartment${index}`}>
                          <Form.Label>Department</Form.Label>
                          <Form.Control
                            as="select"
                            name="department"
                            value={member.department}
                            onChange={(e) => handleTeamMemberChange(index, e)}
                            required
                            className="form-select"
                            isInvalid={validated && !member.department}
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
                        <Form.Group controlId={`formSemester${index}`}>
                          <Form.Label>Semester</Form.Label>
                          <Form.Control
                            as="select"
                            name="semester"
                            value={member.semester}
                            onChange={(e) => handleTeamMemberChange(index, e)}
                            required
                            className="form-select"
                            isInvalid={validated && !member.semester}
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
                  </>
                )}
              </React.Fragment>
            ))}

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formPaymentType">
                  <Form.Label>Payment Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please select a payment type.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {formData.paymentType === 'cash' && (
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group controlId="formTeamMemberName">
                    <Form.Label>Team Member Name for Cash Payment</Form.Label>
                    <Form.Control
                      type="text"
                      name="teamMemberName"
                      value={formData.teamMemberName}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide the name of the team member for cash payment.
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
                        className="form-input"
                      />
                      <div className="d-flex justify-content-center mt-3">
                        <Image
                          src="/ticket/upi id.jpeg"
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
                      <div className="d-flex justify-content-center my-3">
                        <Image
                          src="/ticket/example transaction.jpeg"
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
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your UPI transaction ID.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="formPaymentScreenshot">
                      <Form.Label>Payment Screenshot</Form.Label>
                      <Form.Control
                        type="file"
                        name="paymentScreenshot"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please upload a screenshot of the payment.
                      </Form.Control.Feedback>
                      {formData.paymentScreenshot && (
                        <Image src={formData.paymentScreenshot} alt="Payment Screenshot" fluid className="mt-2 payment-screenshot" />
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}
            <div className="button-container">
              <Button
                type="submit"
                variant="danger"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              {!title.includes('Early Bird') && ticketType !== "Solo" && (
                <Button onClick={handleExport} className="export-button">
                  Export Form Data
                </Button>
              )}
            </div>
          </Form>
        )}
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
    </div>
  );
};

export default TeamTicketPage;

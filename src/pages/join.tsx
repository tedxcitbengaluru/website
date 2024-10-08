import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container, Image, Row, Col, Modal, Spinner, FormGroup } from 'react-bootstrap';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/router';

interface ProficiencySkills {
  [key: string]: string[];
}

interface ProficiencySoundTools {
  [key: string]: string[];
}

interface FormData {
  fullname: string;
  email: string;
  phoneno: string;
  dob: string;
  course: string;
  branch: string;
  semester: string;
  usn: string;
  aboutYourself: string;
  ahaMoment: string;
  collabQuestion: string;
  whyVolunteer: string;
  experience: string;
  teamSelection: string;
  proficiencyCreativeWriting: string;
  creativeWriting: string;
  creativeWritingCaptions: string;
  tedxThemeSuggestions: string;
  movieImpact: string;
  contentFormats: string;
  philosophicalThought: string;
  workLinks: string;
  proficiencyWebsiteDesign: string;
  extremePressureExperience: string;
  workflow: string;
  platformsUsed: string;
  avSetupExperience: string;
  proficiencyGoogleApps: string;
  portfolioLinks: string;
  problemCommunication: string;
  problemSolving: string;
  innovativeIdea: string;
  proficiencySkills: ProficiencySkills;
  proficiencySoundTools: ProficiencySoundTools;
  strategies: string;
  latestTrends: string;
  inspiration: string;
  exampleMarketing: string;
  pitchSponsor: string;
  keyElements: string;
  briefSpeech: string;
  socialLinks: string;
  technologyImplementation: string;
  supportStageFright: string;
  handleDisagreement: string;
  successfulEvent: string;
  eventVolunteerDuties: string;
  standOutFromOthers: string;
  excitementAboutRole: string;
}


const RecruitmentPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    phoneno: '',
    dob: '',
    course: '',
    branch: '',
    semester: '',
    usn: '',
    aboutYourself: '',
    ahaMoment: '',
    collabQuestion: '',
    whyVolunteer: '',
    experience: '',
    teamSelection: '',
    proficiencyCreativeWriting: '',
    creativeWriting: '',
    creativeWritingCaptions: '',
    tedxThemeSuggestions: '',
    movieImpact: '',
    contentFormats: '',
    philosophicalThought: '',
    workLinks: '',
    proficiencyWebsiteDesign: '',
    extremePressureExperience: '',
    workflow: '',
    platformsUsed: '',
    avSetupExperience: '',
    proficiencyGoogleApps: '',
    portfolioLinks: '',
    problemCommunication: '',
    problemSolving: '',
    innovativeIdea: '',
    proficiencySkills: {
      figma: [],
      blender: [],
      illustrator: [],
      photoshop: [],
      premiere: [],
      afterEffects: [],
    },
    proficiencySoundTools: {
      ableton: [],
      flstudio: [],
    },
    strategies: '',
    latestTrends: '',
    inspiration: '',
    exampleMarketing: '',
    pitchSponsor: '',
    keyElements: '',
    briefSpeech: '',
    socialLinks: '',
    technologyImplementation: '',
    supportStageFright: '',
    handleDisagreement: '',
    successfulEvent: '',
    eventVolunteerDuties: '',
    standOutFromOthers: '',
    excitementAboutRole: '',
  });

  const resetForm = () => {
    setFormData({
      fullname: '',
      email: '',
      phoneno: '',
      dob: '',
      course: '',
      branch: '',
      semester: '',
      usn:'',
      aboutYourself: '',
      ahaMoment: '',
      collabQuestion: '',
      whyVolunteer: '',
      experience: '',
      teamSelection: '',
      proficiencyCreativeWriting: '',
      creativeWriting: '',
      creativeWritingCaptions: '',
      tedxThemeSuggestions: '',
      movieImpact: '',
      contentFormats: '',
      philosophicalThought: '',
      workLinks: '',
      proficiencyWebsiteDesign: '',
      extremePressureExperience: '',
      workflow: '',
      platformsUsed: '',
      avSetupExperience: '',
      proficiencyGoogleApps: '',
      portfolioLinks: '',
      problemCommunication: '',
      problemSolving: '',
      innovativeIdea: '',
      proficiencySkills: {
        figma: [],
        blender: [],
        illustrator: [],
        photoshop: [],
        premiere: [],
        afterEffects: [],
      },
      proficiencySoundTools: {
        ableton: [],
        flstudio: [],
      },
      strategies: '',
      latestTrends: '',
      inspiration: '',
      exampleMarketing: '',
      pitchSponsor: '',
      keyElements: '',
      briefSpeech: '',
      socialLinks: '',
      technologyImplementation: '',
      supportStageFright: '',
      handleDisagreement: '',
      successfulEvent: '',
      eventVolunteerDuties: '',
      standOutFromOthers: '',
      excitementAboutRole: '',
    });
    setCurrentSection(1);
    setValidated(false);
  };

  useEffect(() => {
    const fetchTicketSettings = async () => {
      try {
        const response = await fetch('/api/recruitment-settings');
        const data = await response.json();
        if (response.ok) {
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

  const router = useRouter(); 
  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isRecruitmentEnabled, setIsRecruitmentEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resumeUrl, setResumeUrl] = useState("/recruitment/recruitment-form.pdf");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    setFormData(prevState => {
      if (name in prevState.proficiencySkills) {
        const updatedSkills = { ...prevState.proficiencySkills };
        updatedSkills[name] = checked ? [value] : [];

        return {
          ...prevState,
          proficiencySkills: updatedSkills,
        };
      } else if (name in prevState.proficiencySoundTools) {
        const updatedSoundTools = { ...prevState.proficiencySoundTools };
        updatedSoundTools[name] = checked ? [value] : [];

        return {
          ...prevState,
          proficiencySoundTools: updatedSoundTools,
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const handleNext = () => {
    const form = document.querySelector('form');

    if (form) {
      if (form.checkValidity()) {
        setCurrentSection(currentSection + 1);
        form.classList.remove('was-validated'); // Reset validation feedback for the next section
      } else {
        form.classList.add('was-validated'); // Show validation feedback
      }
    }

    // Reset validation state for the next section
    setValidated(false);
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
    console.log(preparedFormData);

    try {
      const sheetResponse = await fetch('/api/submitRecruitmentForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preparedFormData),
      });

      const responseMessage = await sheetResponse.text(); // Get the response message text

      if (sheetResponse.ok) {
        resetForm();
        router.push('/success');
      } else {
        console.error('Error submitting form data');
        toast.error(responseMessage || 'Error submitting form data');
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
      <Container className="flex items-center justify-center flex-col h-screen">
        <h1 className='text-3xl font-bold mb-4'>Not Available</h1>
        <p className="text-lg text-center max-w-md">Recruitment is not available at the moment.</p>
      </Container>
    );
  }

  return (
    <div className=" flex flex-col items-center gap-8 py-20">
      <Container className="mt-5 p-4  rounded shadow-sm">
        <h1 className="mb-5 text-4xl font-bold">{title}</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {currentSection === 1 && (
            <>
              <h2 className="mb-4 text-3xl font-bold">Section 1</h2>
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
                      className="bg-[#F5F5F5] border border-[#E0E0E0] text-[#121212] rounded-md p-2"
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
                      className="bg-[#F5F5F5] border border-[#E0E0E0] text-[#121212] rounded-md p-2"
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
                      className="bg-[#F5F5F5] border border-[#E0E0E0] text-[#121212] rounded-md p-2"
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
                      <option value="B.E">B.E</option>
                      <option value="B.Com">B.Com</option>
                      <option value="BBA">BBA</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please select a Course.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {(formData.course === "B.E") && (
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
                        <option value="CS-IOT">CS-IOT</option>
                        <option value="CS-DS">CS-DS</option>
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
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please select your semester.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group controlId="usn">
                  <Form.Label>
                    Please provide your University Serial Number (USN) if you have one. 
                    If you do not have a USN, kindly enter your Class and Section.
                  </Form.Label>
                    <Form.Control
                      type="usn"
                      name="usn"
                      value={formData.usn}
                      onChange={handleChange}
                      required
                      className="bg-[#F5F5F5] border border-[#E0E0E0] text-[#121212] rounded-md p-2"
                      isInvalid={validated && !formData.usn}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a USN.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="danger" onClick={handleNext} className="w-100 submit-button">
                Next
              </Button>
            </>
          )}
          {currentSection === 2 && (
            <>
              <h2 className="mb-4 text-3xl font-bold">Section 2</h2>
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
                    <Form.Label>Tell us about a triumphant/&quot;aha&quot; moment in your life so far?</Form.Label>
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
                  onClick={handleNext}
                  className="w-25 mx-3 submit-button"
                >
                  Next
                </Button>
              </Row>
            </>
          )}
          {currentSection === 3 && (
            <>
              <h2 className="mb-4 text-3xl font-bold">Section 3</h2>
              <Row className="mb-5">
                <Col md={12}>
                  <Form.Group controlId="recruitmentroleinfo">
                    <Form.Label>Which Team Would Suit You the Most?</Form.Label>
                    <div className="flex justify-center items-center mt-3">
                      <div className="w-full max-w-[400px] h-[60vh] sm:max-w-[600px] sm:h-[70vh] md:max-w-[800px] md:h-[75vh] lg:max-w-[1000px] lg:h-[80vh] xl:max-w-[1200px] xl:h-[85vh] 2xl:max-w-[1400px] 2xl:h-[90vh] border-2 border-red-600 rounded-lg overflow-hidden">
                        <iframe
                          src={resumeUrl}
                          className="w-full h-full border-none"
                        />
                      </div>
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
                      <option value="Creative Team">Creative Team</option>
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
                  onClick={handleNext}
                  className="w-25 mx-3 submit-button"
                >
                  Next
                </Button>
              </Row>
            </>
          )}

          {currentSection === 4 && (
            <>
              <h2 className="mb-4 text-3xl font-bold">Section 4: {formData.teamSelection} </h2>
              {formData.teamSelection === "Curation Team" && (
                <div>
                  <Form.Group>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Form.Group controlId="proficiencyCreativeWriting">
                          <Form.Label>1. On a scale of 1-10, how proficient are you with creative writing skills?</Form.Label>
                          <Form.Control
                            type="range"
                            min="1"
                            max="10"
                            name="proficiencyCreativeWriting"
                            className="form-control"
                            value={formData.proficiencyCreativeWriting}
                            onChange={handleChange}
                            required
                          />
                          <Form.Text className="rangecss">
                            Are your sure its {formData.proficiencyCreativeWriting} ?
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Form.Group controlId="creativeWriting">
                          <Form.Label>2. Describe your creative writing process.</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={1}
                            name="creativeWriting"
                            value={formData.creativeWriting}
                            onInput={(e) => {
                              const target = e.target as HTMLTextAreaElement;
                              target.style.height = 'auto';
                              target.style.height = `${target.scrollHeight}px`;
                            }}
                            onChange={handleChange}
                            required
                            isInvalid={validated && !formData.creativeWriting}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide 4 eye-catching captions.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Form.Group controlId="creativeWritingCaptions">
                          <Form.Label>3. Write 4 eye-catching captions related to the image.</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={1}
                            name="creativeWritingCaptions"
                            value={formData.creativeWritingCaptions}
                            onInput={(e) => {
                              const target = e.target as HTMLTextAreaElement;
                              target.style.height = 'auto';
                              target.style.height = `${target.scrollHeight}px`;
                            }}
                            onChange={handleChange}
                            required
                            isInvalid={validated && !formData.creativeWritingCaptions}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide 4 eye-catching captions.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-5">
                      <Col md={12}>
                        <Form.Group controlId="proficiencyCreativeWritingimg">
                          <div className="text-center mt-3">
                            <Image
                              src="/recruitment/Lunch_atop_a_Skyscraper_-_Charles_Clyde_Ebbets.jpg"
                              alt="Lunch atop a Skyscraper by Charles Clyde Ebbets"
                              className="img-fluid"
                              style={{ maxWidth: '75%', margin: '0 auto' }}
                            />
                          </div>
                          <h5 className="text-center">Lunch atop a Skyscraper by Charles Clyde Ebbets</h5>
                        </Form.Group>
                      </Col>
                    </Row>

                  </Form.Group>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="tedxThemeSuggestions">
                        <Form.Label>4. Based on the video provided, suggest at least two theme ideas for the next TEDx event along with taglines:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="tedxThemeSuggestions"
                          value={formData.tedxThemeSuggestions}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.tedxThemeSuggestions}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your Theme Suggestions.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="recruitmentroleinfo">
                        <div className="text-center mt-3">
                          <video
                            src="/recruitment/Pixar Short_ Luxo Jr. HD.mp4"
                            controls
                            className="img-fluid"
                            style={{ maxWidth: '100%', margin: '0 auto' }}
                          >
                            Your browser does not support the video tag.
                          </video>
                          <h5 className="text-center mt-2">Pixar Short: Luxo Jr. HD</h5>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="movieImpact">
                        <Form.Label>5. Which movie/book/music/series/poems do you resonate the most with and how did it impact you?</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="movieImpact"
                          value={formData.movieImpact}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.movieImpact}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide movie/book/music/series/poems you resonate the most with and how did it impact you.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="contentFormats">
                        <Form.Label>6. How would you develop and implement a variety of creative content formats such as poems, quizzes, infographics, interactive polls, or any other to reveal and promote a TEDx event theme effectively and engagingly?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="contentFormats"
                          value={formData.contentFormats}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.contentFormats}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide How you would develop and implement creative content formats for a TEDx event.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="philosophicalThought">
                        <Form.Label>7. Please share with us a philosophical thought or an idea that you find particularly fascinating and why it resonates with you?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="philosophicalThought"
                          value={formData.philosophicalThought}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.philosophicalThought}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a philosophical thought or an idea that you find particularly fascinating.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="workLinks">
                        <Form.Label>8. List your work/portfolio links (Wordpress/Medium/𝕩(formerly twitter)/personal website or blog/Goodreads/LinkedIn Articles/Reddit/Github account):</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="workLinks"
                          value={formData.workLinks}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.workLinks}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your work/portfolio links.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              )}

              {formData.teamSelection === "Technical Team" && (
                <div>
                  <Form.Group>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Form.Group controlId="proficiencyWebsiteDesign">
                          <Form.Label>1. On a scale of 1-10, how proficient are you with website design and development?</Form.Label>
                          <Form.Control
                            type="range"
                            min="1"
                            max="10"
                            name="proficiencyWebsiteDesign"
                            className="form-control"
                            value={formData.proficiencyWebsiteDesign}
                            onChange={handleChange}
                            required
                          />
                          <Form.Text className="rangecss">
                            Are your sure its {formData.proficiencyWebsiteDesign} ?
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Form.Group controlId="extremePressureExperience">
                          <Form.Label>2. Tell us about a time when you were faced with extreme pressure (can be unrelated to tech) What did you do?
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={1}
                            name="extremePressureExperience"
                            value={formData.extremePressureExperience}
                            onInput={(e) => {
                              const target = e.target as HTMLTextAreaElement;
                              target.style.height = 'auto';
                              target.style.height = `${target.scrollHeight}px`;
                            }}
                            onChange={handleChange}
                            required
                            isInvalid={validated && !formData.extremePressureExperience}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide your answer.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="workflow">
                        <Form.Label>3. Give us a glimpse of your workflow. Do you use (Notion/Obsidian/Google Calendar/Other) to organize your day? If yes, explain how.
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="workflow"
                          value={formData.workflow}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.workflow}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="platformsUsed">
                        <Form.Label>4. What platforms/frameworks or tools do you use & have worked on?</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="platformsUsed"
                          value={formData.platformsUsed}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.platformsUsed}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="avSetupExperience">
                        <Form.Label>5. What experience do you have with live streaming, AV setups, stage equipment handling or similar technologies?</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="avSetupExperience"
                          value={formData.avSetupExperience}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.avSetupExperience}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={12}>
                      <Form.Group controlId="proficiencyGoogleApps">
                        <Form.Label>6. How proficient are you with handling Google Drive & other Google Apps on a scale of 1-10?</Form.Label>
                        <Form.Control
                          type="range"
                          min="1"
                          max="10"
                          name="proficiencyGoogleApps"
                          className="form-control"
                          value={formData.proficiencyGoogleApps}
                          onChange={handleChange}
                          required
                        />
                        <Form.Text className="rangecss">
                          Are your sure its {formData.proficiencyGoogleApps} ?
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="portfolioLinks">
                        <Form.Label>7. List your work/portfolio links. (Github/Figma/Personal websites/Web development project links)
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="portfolioLinks"
                          value={formData.portfolioLinks}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.portfolioLinks}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="problemCommunication">
                        <Form.Label>8. Can you communicate the problems you face to your teammates clearly? Can you intuitively communicate and fix problems that arise without being explicitly told or wait for the right moment?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="problemCommunication"
                          value={formData.problemCommunication}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.problemCommunication}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="innovativeIdea">
                        <Form.Label>9. What is one innovative idea you would bring to the TEDx Team on the technical side that is cool or convenient (or both). (Example: Automating event confirmation emails)</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="innovativeIdea"
                          value={formData.innovativeIdea}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.innovativeIdea}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              )}

              {formData.teamSelection === "Creative Team" && (
                <div>
                  <Form.Label>1. How proficient are you with the following softwares:</Form.Label>
                  <table className="proficiency-grid">
                    <thead>
                      <tr>
                        <th>Software</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['figma', 'blender', 'illustrator', 'photoshop', 'premiere', 'afterEffects'].map(software => (
                        <tr key={software}>
                          <td>{software.charAt(0).toUpperCase() + software.slice(1)}</td>
                          {[1, 2, 3, 4, 5].map(value => (
                            <td key={value}>
                              <input
                                type="checkbox"
                                name={software}
                                value={value.toString()}
                                checked={formData.proficiencySkills[software]?.[0] === value.toString()}
                                onChange={handleChange}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Form.Label>2. How proficient are you with the following sound engineering tools?
                  </Form.Label>
                  <table className="proficiency-grid">
                    <thead>
                      <tr>
                        <th>Sound Engg. Tools</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['ableton', 'flstudio'].map(tool => (
                        <tr key={tool}>
                          <td>{tool.charAt(0).toUpperCase() + tool.slice(1)}</td>
                          {[1, 2, 3, 4, 5].map(value => (
                            <td key={value}>
                              <input
                                type="checkbox"
                                name={tool}
                                value={value.toString()}
                                checked={formData.proficiencySoundTools[tool]?.[0] === value.toString()}
                                onChange={handleChange}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="strategies">
                        <Form.Label>3. What strategies do you use to make an event visually and experientially engaging?</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="strategies"
                          value={formData.strategies}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.strategies}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="latestTrends">
                        <Form.Label>4. What are some of the latest trends in design and technology that excite you?</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="latestTrends"
                          value={formData.latestTrends}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.latestTrends}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="inspiration">
                        <Form.Label>5. What inspires your creative work, and how do you translate that inspiration?</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="inspiration"
                          value={formData.inspiration}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.inspiration}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="workLinks">
                        <Form.Label>6. Can you share some of your past work in graphic design, video production, or any other creative field? (links: Instagram / Behance / Youtube / Pinterest / Dribble / Figma / Other)</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="workLinks"
                          value={formData.workLinks}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.workLinks}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              )}

              {formData.teamSelection === "Sponsorship Team" && (
                <div>
                  <Row className="mb-3">
                    <Col md={12}>
                      <Form.Group controlId="exampleMarketing">
                        <Form.Label>1. Can you provide an example of a successful marketing campaign you managed and its impact?</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="exampleMarketing"
                          value={formData.exampleMarketing}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.exampleMarketing}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="pitchSponsor">
                        <Form.Label>2. Imagine you are pitching our TEDx event to a potential sponsor. How would you convince them?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="pitchSponsor"
                          value={formData.pitchSponsor}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.pitchSponsor}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="keyElements">
                        <Form.Label>3. Describe the key elements you would include in a sponsorship proposal:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="keyElements"
                          value={formData.keyElements}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.keyElements}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="briefSpeech">
                        <Form.Label>4. Imagine you are giving a brief speech at a community event. What key points would you include?</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="briefSpeech"
                          value={formData.briefSpeech}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.briefSpeech}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="socialLinks">
                        <Form.Label>5. List your social media or Shopify links:
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="socialLinks"
                          value={formData.socialLinks}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.socialLinks}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              )}

              {formData.teamSelection === "Event Management Team" && (
                <div>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="technologyImplementation">
                        <Form.Label>1. How do you plan to implement technology tools/apps/AI for Event Management?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="technologyImplementation"
                          value={formData.technologyImplementation}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.technologyImplementation}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="supportStageFright">
                        <Form.Label>2. Imagine one of our keynote speakers is experiencing stage fright. How would you support them?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="supportStageFright"
                          value={formData.supportStageFright}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.supportStageFright}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="handleDisagreement">
                        <Form.Label>3. How do you handle situations when guests disagree with your feedback?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="handleDisagreement"
                          value={formData.handleDisagreement}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.handleDisagreement}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="successfulEvent">
                        <Form.Label>4. What does a successful event look like to you?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="successfulEvent"
                          value={formData.successfulEvent}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.successfulEvent}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="eventVolunteerDuties">
                        <Form.Label>5. What do you think are the duties of an Event Management Volunteer?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="eventVolunteerDuties"
                          value={formData.eventVolunteerDuties}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.eventVolunteerDuties}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="standOutFromOthers">
                        <Form.Label>6. How do you stand out from other candidates for this role?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="standOutFromOthers"
                          value={formData.standOutFromOthers}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.standOutFromOthers}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col md={12}>
                      <Form.Group controlId="excitementAboutRole">
                        <Form.Label>7. What excites you most about being involved in event management?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="excitementAboutRole"
                          value={formData.excitementAboutRole}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                          onChange={handleChange}
                          required
                          isInvalid={validated && !formData.excitementAboutRole}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your answer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
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
        <Toaster
        position="bottom-right"
        richColors
        toastOptions={{
          style: {
            background: '#1F1F1F', 
            color: '#E0E0E0', 
          },
        }}
      />
      <Modal
        show={showConfirmModal}
        onHide={handleCancel}
        centered
        className=" text-light" 
      >
        <Modal.Header className='bg-dark text-light' closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark text-light'>
          Are you sure you want to submit the form?
        </Modal.Body>
        <Modal.Footer className='bg-dark text-light'>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      </Container >
    </div>
  );
};

export default RecruitmentPage;

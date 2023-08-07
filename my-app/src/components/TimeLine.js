
import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const ColorStepIcon = styled('span')(({ theme }) => ({
  '&.MuiStepIcon-root': {
    color: '#FFB81C'
  },
  '&.MuiStepIcon-active': {
    color: '#FFB81C'
  },
  '&.MuiStepIcon-completed': {
    color: '#FFB81C'
  }
}));

const CustomStepIconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'center',
}));

const CustomStepIcon = styled('div')(({ theme, active }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%', 
  backgroundColor: active ? '#FFB81C' : '#ffffff', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: active ? '#ffffff' : '#000000', 
  fontSize: 18,
  marginBottom: 8, 
  border: `2px solid ${active ? '#FFB81C' : '#000000'}`, 
}));

const CustomConnector = styled('div')(({ theme }) => ({
  flex: '1 1 auto',
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'center', 
}));

function TimeLine() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNextStep = () => {
    if (activeStep < 4)
      setActiveStep((currentStep) => currentStep + 1);
  }

  const handlePreviousStep = () => {
    if (activeStep !== 0)
      setActiveStep((currentStep) => currentStep - 1);
  }

  return (
    <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center' }}>
      <Box width="50%">
        <Stepper activeStep={activeStep} connector={<CustomConnector />}>
          <Step>
            <StepLabel StepIconComponent={CustomStepIconContainer}>
              <CustomStepIcon active={activeStep === 0}>
                1
              </CustomStepIcon>
              Upload current schedule
            </StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={CustomStepIconContainer}>
              <CustomStepIcon active={activeStep === 1}>
                2
              </CustomStepIcon>
              Generate new schedule
            </StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={CustomStepIconContainer}>
              <CustomStepIcon active={activeStep === 2}>
                3
              </CustomStepIcon>
              Confirm new schedule
            </StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={CustomStepIconContainer}>
              <CustomStepIcon active={activeStep === 3}>
                4
              </CustomStepIcon>
              Generate website code
            </StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={CustomStepIconContainer}>
              <CustomStepIcon active={activeStep === 4}>
                5
              </CustomStepIcon>
              Add to GCal & tasks
            </StepLabel>
          </Step>
        </Stepper>
        {/*  <h3>{activeStep}</h3> */}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleNextStep}
          fullWidth
          disabled={activeStep === 4}
        >
          Next step
        </Button>
        <br />
        <br />
        <Button
          variant="outlined"
          color="primary"
          onClick={handlePreviousStep}
          fullWidth
          disabled={activeStep === 0}
        >
          Previous step
        </Button>
      </Box>
    </Container>
  );
}

export default TimeLine;

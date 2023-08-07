import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

// Custom styles for color and connector
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

const CustomConnector = styled('div')(({ theme }) => ({
  flex: '1 1 auto',
  marginTop: 8,
  borderBottom: '1px solid #FFB81C',
}));

function TimeLine() {
    const [activeStep, setActiveStep] = React.useState(0);

    const nextStep = () => {
        if (activeStep < 4) 
            setActiveStep((currentStep) => currentStep + 1);
    }

    const previousStep = () => {
        if (activeStep !== 0)
            setActiveStep((currentStep) => currentStep - 1);
    }

    return (
        <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center' }}>
            <Box width="50%">
                <Stepper activeStep={activeStep} connector={<CustomConnector />}>
                    <Step>
                        <StepLabel StepIconComponent={ColorStepIcon}>first</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel StepIconComponent={ColorStepIcon}>second</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel StepIconComponent={ColorStepIcon}>third</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel StepIconComponent={ColorStepIcon}>fourth</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel StepIconComponent={ColorStepIcon}>fifth</StepLabel>
                    </Step>
                </Stepper>
                <h3>{activeStep}</h3>
                <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={nextStep}
                    fullWidth
                >
                    Next step
                </Button>
                <br />
                <br />
                <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={previousStep}
                    fullWidth
                >
                    Previous step
                </Button>
            </Box>
        </Container>
    );
}

export default TimeLine;

import React from "react";
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"


function TimeLine() {
    
    const [activeStep, setActiveStep] = React.useState(0)
    
    const nextStep = () => {
        if(activeStep < 4) //may hv to change this!
        setActiveStep((currentStep) => currentStep + 1) //current step is activestep + 1
        
    }
    const previousStep = () => {
                if(activeStep !== -1)
        setActiveStep((currentStep) => currentStep - 1) 
        
    }
    
  return (
   <div>
   <Stepper activeStep={activeStep}>
   <Step> 
   <StepLabel>first</StepLabel>
   </Step>
   <Step> 
   <StepLabel>second</StepLabel>
   </Step>
   <Step> 
   <StepLabel>third</StepLabel>
   </Step>
   <Step> 
   <StepLabel>fourth</StepLabel>
   </Step>
   <Step> 
   <StepLabel>fifth</StepLabel>
   </Step>
   </Stepper>
   <h3>{activeStep}</h3> //temp 
 <Button 
 variant = "outlined" 
 color="primary"
 onClick={() => nextStep()}
 >
 Next step
 </Button>
 <br />
 <br />
  <Button 
  variant = "outlined" 
  color="primary"
   onClick={() => previousStep()}
  >
  Previous step
  </Button>

   </div>
   
  );
}

export default TimeLine;
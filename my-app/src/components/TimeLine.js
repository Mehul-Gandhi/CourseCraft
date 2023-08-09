import React from "react";

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
    <div className="flex justify-center w-full">
      <div className="w-1/2 space-y-4">
        <div className="flex space-x-5">
          {[...Array(5)].map((_, idx) => (
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-2 
                  ${activeStep === idx ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-white text-black border-black'}`}
              >
                {idx + 1}
              </div>
              <p className="mt-2 text-white">
                {{
                  0: "Upload current schedule",
                  1: "Generate new schedule",
                  2: "Confirm new schedule",
                  3: "Generate website code",
                  4: "Add to GCal & tasks"
                }[idx]}
              </p>
            </div>
          ))}
        </div>

        <button
          className={`w-full py-2 px-4 border rounded ${activeStep === 4 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white cursor-pointer'}`}
          onClick={handleNextStep}
          disabled={activeStep === 4}
        >
          Next step
        </button>

        <button
          className={`w-full py-2 px-4 border rounded mt-4 ${activeStep === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white cursor-pointer'}`}
          onClick={handlePreviousStep}
          disabled={activeStep === 0}
        >
          Previous step
        </button>
      </div>
    </div>
  );
}

export default TimeLine;

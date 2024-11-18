import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, CardMedia, MobileStepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const EmptyCarousel = () => {
  const [frameHeight, setFrameHeight] = useState(0);
  useEffect(() => {
    const updateHeight = () => {
      setFrameHeight(
        document.querySelector<HTMLImageElement>(".animationFrame")!.height
      );
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: frameHeight,
      }}
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDirection="column"
      textAlign="center"
    >
      <SentimentVeryDissatisfiedIcon />
      Something went wrong with this animation
    </Box>
  );
};

export const Carousel: React.FC<{ images: string[]; id: string }> = ({
  images,
  id,
}) => {
  const steps = images;
  const maxSteps = steps.length;
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Box sx={{ width: "100%" }}>
      {maxSteps ? (
        <CardMedia
          className="animationFrame"
          component="img"
          src={`frames/${id}/${steps[activeStep]}`}
        />
      ) : (
        <EmptyCarousel />
      )}
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={maxSteps === 0 ? -1 : activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1 || maxSteps === 0}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Box>
  );
};

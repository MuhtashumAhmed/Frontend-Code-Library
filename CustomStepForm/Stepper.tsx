"use client";
import React, { useState } from "react";

type Step = {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
};

type StepperProps = {
  steps: Step[];
  orientation?: "horizontal" | "vertical";
};

const Stepper: React.FC<StepperProps> = ({
  steps,
  orientation = "horizontal",
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const isVertical = orientation === "vertical";

  const progressPercent =
    steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 0;

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const back = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full">
      {/* STEP HEADER */}
      {!isVertical && (
        <div className="relative mb-10">
          {/* Background Line */}
          <div
            className="absolute top-5 h-1 bg-gray-200 rounded"
            style={{
              left: `${100 / (steps.length * 2)}%`,
              right: `${100 / (steps.length * 2)}%`,
            }}
          />

          {/* Progress Line */}
          <div
            className="absolute top-5 h-1 bg-blue-500 rounded transition-all duration-300"
            style={{
              left: `${100 / (steps.length * 2)}%`,
              width: `calc(${progressPercent}% - ${
                progressPercent / steps.length
              }%)`,
            }}
          />

          {/* Steps */}
          <div className="flex justify-between relative">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center w-full"
                >
                  {/* Circle */}
                  <div
                    className={`
                      w-10 h-10 flex items-center justify-center rounded-full border-2
                      transition-all duration-300 z-10 relative bg-white
                      ${
                        isCompleted
                          ? "bg-blue-500 border-blue-500 text-black"
                          : isActive
                          ? "border-blue-500 text-blue-500"
                          : "border-gray-300 text-gray-400"
                      }
                    `}
                  >
                    {isCompleted ? "✓" : step.icon ?? index + 1}
                  </div>

                  {/* Label */}
                  <p
                    className={`
                      mt-2 text-sm text-center
                      ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "text-gray-500"
                      }
                    `}
                  >
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VERTICAL MODE */}
      {isVertical && (
        <div className="flex">
          <div className="relative mr-6">
            {/* Line */}
            <div
              className="absolute left-5 w-1 bg-gray-200 rounded"
              style={{
                top: "20px",
                bottom: "20px",
              }}
            />

            {/* Active Line */}
            <div
              className="absolute left-5 w-1 bg-blue-500 rounded transition-all"
              style={{
                top: "20px",
                height: `${
                  steps.length > 1
                    ? (currentStep / (steps.length - 1)) * 100
                    : 0
                }%`,
                maxHeight: "calc(100% - 40px)",
              }}
            />

            {/* Steps */}
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div
                  key={index}
                  className="flex items-center mb-10 relative last:mb-0"
                >
                  <div
                    className={`
                      w-10 h-10 flex items-center justify-center rounded-full border-2 z-10 bg-white
                      ${
                        isCompleted
                          ? "bg-blue-500 border-blue-500 text-white"
                          : isActive
                          ? "border-blue-500 text-blue-500"
                          : "border-gray-300 text-gray-400"
                      }
                    `}
                  >
                    {isCompleted ? "✓" : step.icon ?? index + 1}
                  </div>

                  <p
                    className={`ml-4 ${
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="p-4 border rounded-lg min-h-[120px]">
              {steps[currentStep]?.content}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={back}
                disabled={currentStep === 0}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Back
              </button>

              <button
                onClick={next}
                disabled={currentStep === steps.length - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT (Horizontal Mode) */}
      {!isVertical && (
        <>
          <div className="p-4 border rounded-lg min-h-[120px]">
            {steps[currentStep]?.content}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={back}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Back
            </button>

            <button
              onClick={next}
              disabled={currentStep === steps.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Stepper;

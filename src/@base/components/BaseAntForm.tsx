import cn from "@/src/@libs/utils/_cn";
import { Button, Form, FormInstance, Steps } from "antd";
import React, { useCallback, useEffect, useState } from "react";

interface Step {
  label: string;
  content: React.ReactNode;
}

interface IProps<D = any> {
  className?: string;
  formType?: "create" | "update";
  formInstance: FormInstance;
  formProps?: Partial<React.ComponentProps<typeof Form>>;
  initialValues?: Partial<D>;
  steps: Step[];
  isLoading: boolean;
  onSubmit: (values: D) => void;
  onChangeValues?: (values: Partial<D>) => void;
  isStep?: boolean;
}

const BaseAntForm = <D = any,>({
  className,
  formType = "create",
  formInstance,
  formProps,
  initialValues,
  steps,
  isLoading,
  onSubmit,
  onChangeValues,
  isStep = false,
}: IProps<D>) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [persist, setPersist] = useState<Partial<D>>(initialValues || {});
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handlePersistFn = useCallback(
    (values: Partial<D>) => {
      setPersist(values);
      onChangeValues?.(values);
    },
    [onChangeValues],
  );

  const handlePrevFn = useCallback(() => {
    if (!isFirstStep) setCurrentStep((prev) => prev - 1);
  }, [isFirstStep]);

  const handleNextFn = useCallback(async () => {
    try {
      const currentValues = await formInstance.validateFields();
      const purifiedValues = { ...persist, ...currentValues };

      handlePersistFn(purifiedValues);
      setCompletedSteps((prev) => new Set(prev).add(currentStep));
      setCurrentStep((prev) => prev + 1);
      formInstance.setFieldsValue(purifiedValues);
    } catch (_error) {}
  }, [currentStep, formInstance, handlePersistFn, persist]);

  const handleFinishFn = useCallback(async () => {
    try {
      const lastStepValues = await formInstance.validateFields();
      const purifiedValues = { ...persist, ...lastStepValues };

      setCompletedSteps((prev) => new Set(prev).add(currentStep));
      onSubmit(purifiedValues as D);
    } catch (_error) {}
  }, [currentStep, formInstance, onSubmit, persist]);

  useEffect(() => {
    if (formType === "update" && initialValues) {
      const completed = new Set<number>();
      for (let i = 0; i < steps.length; i++) {
        completed.add(i);
      }
      setCompletedSteps(completed);
    }
  }, [formType, initialValues, steps.length]);

  return (
    <div className={cn("space-y-6", className)}>
      {isStep && (
        <div className="flex justify-between gap-4 overflow-x-auto pt-10 md:gap-2">
          <Steps
            progressDot
            current={currentStep}
            items={steps?.map((item, idx) => ({
              key: item?.label,
              title: item?.label,
              onClick: async () => {
                if (idx === currentStep) return;

                if (completedSteps.has(idx)) {
                  if (idx > currentStep) await formInstance.validateFields();
                  formInstance.setFieldsValue(persist);
                  return;
                }

                if (idx === currentStep + 1) {
                  try {
                    const currentValues = await formInstance.validateFields();
                    const purifiedValues = { ...persist, ...currentValues };

                    handlePersistFn(purifiedValues);
                    formInstance.setFieldsValue(purifiedValues);
                    setCompletedSteps((prev) => new Set(prev).add(currentStep));
                  } catch (_error) {}
                }
              },
            }))}
          />
        </div>
      )}

      <Form
        layout="vertical"
        size="large"
        {...formProps}
        form={formInstance}
        initialValues={initialValues}
        onFinish={handleFinishFn}
      >
        {isStep ? (
          <>
            <div>{steps[currentStep].content}</div>
            <div className="mt-4 flex justify-between border-t pt-4">
              <Button onClick={handlePrevFn} disabled={isFirstStep}>
                Back
              </Button>
              {isLastStep ? (
                <Button
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                >
                  {formType === "create" ? "Submit" : "Update"}
                </Button>
              ) : (
                <Button key="next" type="primary" onClick={handleNextFn}>
                  Next
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            {steps.map((step) => (
              <div key={step.label}>{step.content}</div>
            ))}
            <div className="mt-4 flex justify-end border-t pt-4">
              <Button type="primary" htmlType="submit" loading={isLoading}>
                {formType === "create" ? "Submit" : "Update"}
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};

export default BaseAntForm;

import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

import { useData } from "./DataProvider";
interface InterviewSettingsFormProps {
  handleNext: () => void;
  handlePrevious: () => void;
}

const InterviewSettingsForm: React.FC<InterviewSettingsFormProps> = ({ handleNext, handlePrevious }) => {
  const { state, updateInterviewSettings } = useData()!;

  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
    dirty,
  } = useFormik<IInterViewSettings>({
    initialValues: state.interviewSettings,
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview mode is required"),
      interviewDuration: Yup.string().required("Interview duration is required"),
      interviewLanguage: Yup.string().required("Interview language is required"),
    }),
    onSubmit: (values) => {
      if (isFormValid) {
        updateInterviewSettings(values);
        alert("Form successfully submitted\nIntern rakh lo plej 🥹");
        // You can add any additional submission logic here
      }
    },
  });

  const isFormValid = useMemo(() => {
    return (
      values.interviewMode !== "" &&
      values.interviewDuration !== "" &&
      values.interviewLanguage !== "" &&
      Object.keys(errors).length === 0
    );
  }, [values, errors]);

  useEffect(() => {
    // if (isFormValid) {
      updateInterviewSettings(values);
    // }
  }, [values]);
  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
        <Button colorScheme="gray" type="button" onClick={handlePrevious}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit" isDisabled={!isFormValid}>
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewSettingsForm;

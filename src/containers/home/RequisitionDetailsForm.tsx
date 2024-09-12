import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";

import { useData } from "./DataProvider";

interface RequisitionDetailsFormProps {
  handleNext: () => void;
  handlePrevious: () => void;
}

const RequisitionDetailsForm: React.FC<RequisitionDetailsFormProps> = ({ handleNext, handlePrevious }) => {

  const { state, updateRequisitionDetails } = useData()!;

  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
    dirty,
  } = useFormik<IRequisitionDetails>({
    initialValues: state.requisitionDetails,
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {

      if(isValid){
        updateRequisitionDetails(values);
        handleNext();
      }

    },
  });

  const isFormValid = useMemo(() => {
    return (
      values.requisitionTitle !== "" &&
      values.noOfOpenings !== 0 &&
      values.urgency !== "" &&
      values.gender !== "" &&
      Object.keys(errors).length === 0
    );
  }, [values, errors]);

  useEffect(() => {
    if (isFormValid) {
      updateRequisitionDetails(values);
    }  
  }, [values]);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={handlePrevious}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit" isDisabled={!isFormValid}>
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;

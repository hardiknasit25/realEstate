import { useState } from 'react';
import { Stepper } from '@mantine/core';
import AddLocation from './AddLocation';
import UploadImage from './UploadImage';
import BasicDetails from './BasicDetails';
import Facilities from './Facilities';
import { useSelector } from "react-redux";

function Steps() {

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const { currentUser } = useSelector(state => state.user);
  const validateString = (value) => {
    if (value?.length < 3 || value === null) {
      return 'Must have atlest 3 characters';
    }
  }

  const [propertyDetails, setPropertyDetails] = useState({
    country: "",
    city: "",
    address: "", 
    imageUrls: [],
    title: "",
    description: "",
    type: "sale",
    furnished: false,
    price: 0,
    bedrooms: 0,
    parkings: 0,
    bathrooms: 0,
    userRef: currentUser._id
  });

return (
  <>
    <Stepper
      active={active}
      onStepClick={setActive}
      breackpoint="sm"
      allowNextStepsSelect={false}>
      <Stepper.Step label="Location" description="Address">
        <AddLocation
          nextStep={nextStep}
          propertyDetails={propertyDetails}
          setPropertyDetails={setPropertyDetails}
          validateString={validateString} />
      </Stepper.Step>
      <Stepper.Step label="Images" description="Upload">
        <UploadImage
          nextStep={nextStep}
          prevStep={prevStep}
          propertyDetails={propertyDetails}
          setPropertyDetails={setPropertyDetails}
        />
      </Stepper.Step>
      <Stepper.Step label="Basics" description="Details">
        <BasicDetails
          prevStep={prevStep}
          nextStep={nextStep}
          propertyDetails={propertyDetails}
          setPropertyDetails={setPropertyDetails}
          validateString={validateString}
        />
      </Stepper.Step>

      <Stepper.Step>
        <Facilities
          prevStep={prevStep}
          propertyDetails={propertyDetails}
          setPropertyDetails={setPropertyDetails}
          setActiveStep={setActive}
        />
      </Stepper.Step>
      <Stepper.Completed>
        Completed, click back button to get to previous step
      </Stepper.Completed>
    </Stepper >
  </>
);
}

export default Steps
import { Stepper } from '@mantine/core';
import UpdateLocation from './UpdateLocation';
import UpdateImage from './UpdateImage';
import UpdateBasicDetails from './UpdateBasicDetails';
import UpdateFacilities from './UpdateFacilities';
import { useSelector } from "react-redux";
import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

function UpdateSteps() {

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const { currentUser } = useSelector(state => state.user);
  const params = useParams();
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

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.Id;
      const res = await fetch(`http://localhost:4000/get/${listingId}`)
      const data = await res.json();
      if(data.success === false){
        console.log(data.message);
        return;
      } 
      setPropertyDetails(data);
    }

    fetchListing();
  },[params.Id]);

  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        breackpoint="sm"
        allowNextStepsSelect={false}>
        <Stepper.Step label="Location" description="Address">
          <UpdateLocation
            nextStep={nextStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
            validateString={validateString} />
        </Stepper.Step>
        <Stepper.Step label="Images" description="Upload">
          <UpdateImage
            nextStep={nextStep}
            prevStep={prevStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>
        <Stepper.Step label="Basics" description="Details">
          <UpdateBasicDetails
            prevStep={prevStep}
            nextStep={nextStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
            validateString={validateString}
          />
        </Stepper.Step>

        <Stepper.Step>
          <UpdateFacilities
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

export default UpdateSteps
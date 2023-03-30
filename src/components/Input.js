/**
 * Main Input Page for User
 * @author Joseph Liao
 */

import { React, useState } from "react";

// MD5 Bootstrap components
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

// The toast alert
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Navigation for forwarding the page
import { useNavigate } from "react-router-dom";

// Import Server URL from constants
import { ServerUrl } from "../consts";

// Use the toast info for information alert
import { toast } from "react-toastify";

function Input() {
  // The useState hook for username and phone
  // Here I choose the easiest way to handle this problem
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  // Navigation
  const navigate = useNavigate();

  // The formation of responseBody
  interface FormDataType {
    username: string;
    phone: string;
  }
  const requestBody: FormDataType = { username: "", phone: "" };

  /**
   * The dynamic change method for attributes input, High cohesion pattern for updating parameters
   * @param setFunction the setter for useState
   * @param event the trigger action
   */
  const updateInput = (
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setFunction(event.target.value);
  };

  /**
   * The submit action
   */
  const onSubmitHandler = () => {
    // Assign values to the request body.
    requestBody.username = username;
    requestBody.phone = phone;

    // Form submission happens here
    addInfo(requestBody);
  };

  /**
   * The fetch action for retrieving information by calling the url
   * @param requestBody the formatted request body
   */
  const addInfo = async (requestBody) => {
    try {
      // test
      console.log(`${ServerUrl}/api/users/`);

      // Call the api
      const response = await fetch(`${ServerUrl}/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(requestBody),
      });

      // Extract the json data of response
      const data = await response.json();

      // Reply => 200 or 201 both ok, but here only 201 matters
      if (response.status == 200 || response.status == 201) {
        toast.success("Successfully added into the database!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Navigate to the success page after 2 seconds of delay
        // With the passed value
        setTimeout(
          () =>
            navigate("success", { state: { username: requestBody.username } }),
          2000
        );
      } else {
        toast.error(`Verification failed: ${data.errMessage}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">MealPal</h2>

              <p className="text-white-50 mb-3">
                Please enter your full name and phone!
              </p>

              <p className="text-white-50 mb-3">
                1. Name should has first and last name <br />
                (should has at least two words)
              </p>

              <p className="text-white-50 mb-3">
                2. Phone should be in valid format <br />
                (should only contains 10 or 11 digits )
              </p>

              <p className="text-white-50 mb-3">
                A message will alert after submitting. <br />A welcome page will
                show if both valid
              </p>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="First & Last Name"
                id="username"
                value={username}
                type="text"
                size="lg"
                onChange={(e) => updateInput(setUsername, e)}
              />

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Phone Number"
                id="phone"
                value={phone}
                type="number"
                size="lg"
                onChange={(e) => updateInput(setPhone, e)}
              />

              <MDBBtn
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
                onClick={() => {
                  onSubmitHandler();
                }}
              >
                Submit
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}

export default Input;

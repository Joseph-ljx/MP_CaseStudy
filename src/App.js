import { React, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  //MDBIcon,
} from "mdb-react-ui-kit";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

// Functions for calling this request from the front end
import { addInfo } from "./utils/functions";

function App() {
  // The exhibition state of the result
  const [open, setOpen] = useState(true);

  // The useState hook for username and phone
  // Here I choose the easiest way to handle this problem
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  // The formation of responseBody
  interface FormDataType {
    username: string;
    phone: string;
  }
  const requestBody: FormDataType = { UserName: "", Phone: "" };

  // The dynamic change for username input
  const updateUserName = (
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setFunction(event.target.value);
  };

  // // The dynamic change for phone input
  const updatePhone = (
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setFunction(event.target.value);
  };

  // The submit action
  const onSubmitHandler = () => {
    // event.preventDefault();
    requestBody.UserName = username;
    requestBody.Phone = phone;
    //Form submission happens here
    addInfo(requestBody);
  };

  // Render
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

              {/* <p className="small mb-1 pb-lg-0">
                <a class="text-white-50" href="#!">
                  Rules:
                </a>
              </p> */}
              <p className="text-white-50 mb-3">
                1. Name should both first and last name
              </p>
              <p className="text-white-50 mb-3">2. Phone should be valid</p>

              <p className="text-white-50 mb-3">
                The result will show after submitting
              </p>

              {/* the result alert */}
              <Box sx={{ width: "100%" }}>
                <Collapse in={open}>
                  <Alert
                    severity="success"
                    // action={
                    //   <IconButton
                    //     aria-label="close"
                    //     color="inherit"
                    //     size="small"
                    //     onClick={() => {
                    //       setOpen(false);
                    //     }}
                    //   >
                    //     X
                    //   </IconButton>
                    // }
                    sx={{ mb: 2 }}
                  >
                    Close me!
                  </Alert>
                </Collapse>
                {/* <Button
                  disabled={open}
                  variant="outlined"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Re-open
                </Button> */}
              </Box>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="First & Last Name"
                id="username"
                value={username}
                type="text"
                size="lg"
                onChange={(e) => updateUserName(setUsername, e)}
              />

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Phone Number"
                id="phone"
                value={phone}
                type="number"
                size="lg"
                onChange={(e) => updatePhone(setPhone, e)}
              />

              <MDBBtn
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
                onClick={() => {
                  setOpen(!open);
                  onSubmitHandler();
                }}
              >
                Submit
              </MDBBtn>

              {/* <div className="d-flex flex-row mt-3 mb-5">
                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="facebook-f" size="lg" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="twitter" size="lg" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="google" size="lg" />
                </MDBBtn>
              </div> */}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;

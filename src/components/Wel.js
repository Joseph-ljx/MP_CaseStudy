/**
 * The Successful Page for exhibiting username
 * @author Joseph Liao
 */

import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";

// Obtain the username from navigation
import { useLocation } from "react-router-dom";

/**
 * The Wel Component
 * @returns the 'Wel' component
 */
function Wel() {
  const location = useLocation();
  const username = location.state.username;
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Welcome !</h2>
              <p className="text-white-50 mb-3">{username}</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Wel;

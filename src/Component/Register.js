import React from 'react';
import './Router/Login.css'; // Import your CSS file

const Register = () => {
  return (
    <div className="img js-fullheight" style={{ backgroundImage: 'url(images/bg.jpg)' }}>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">Register</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Create an account?</h3>
                <form action="#" className="signin-form">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="First Name" required />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Last Name" required />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Birthday" required />
                    <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Email" required />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Phone Number" required />
                  </div>
                  <div className="form-group">
                    <input
                      id="password-field"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                    <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                  </div>
                  <div className="form-group">
                    <input
                      id="confirm-password-field"
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      required
                    />
                    <span
                      toggle="#confirm-password-field"
                      className="fa fa-fw fa-eye field-icon toggle-password"
                    ></span>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="form-control btn btn-primary submit px-3">
                      Sign Up
                    </button>
                  </div>
                  <div className="signup">
                    You have an account?
                    <a href="d">Sign in Now</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
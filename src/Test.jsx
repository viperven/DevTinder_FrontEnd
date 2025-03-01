import React, { useState } from "react";

function Test() {
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleFormState = (e, name) => {};

  const checkFormValidations = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    if (formData.name === "") {
      newErrors.name = "Name is mandatory";
    } else if (formData.name.length > 50) {
      newErrors.name = "Name length cannot be greater than 50 letters";
    }

    if (formData.emailId === "") {
      newErrors.emailId = "Email ID is mandatory";
    } else if (!emailRegex.test(formData.emailId)) {
      newErrors.emailId = "Email ID is not valid";
    }

    if (formData.password === "") {
      newErrors.password = "Password is mandatory";
    } else if (formData.password.length < 8 || formData.password.length > 50) {
      newErrors.password =
        "Password length must be between 8 and 50 characters";
    }

    setErrors(newErrors); // Update the errors state
    return Object.keys(newErrors).length === 0; // Return validation result
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const isValid = checkFormValidations();

    if (isValid) {
      console.log(formData, "Form submitted successfully");
    }
  };

  return (
    <>
      <div className="container">
        <h1>Form in React</h1>
        <div>
          <input
            name="username"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          {errors.name && <h6>{errors.name}</h6>}

          <input
            name="useremailid"
            type="email"
            placeholder="Enter your email ID"
            value={formData.emailId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, emailId: e.target.value }))
            }
          />
          {errors.emailId && <h6>{errors.emailId}</h6>}

          <input
            name="userpassword"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          {errors.password && <h6>{errors.password}</h6>}

          <button type="submit" onClick={handleFormSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Test;

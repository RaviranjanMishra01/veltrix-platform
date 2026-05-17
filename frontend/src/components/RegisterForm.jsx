import { useState } from "react";
import { registerUser } from "../APIS/authApi";
import "./RegisterForm.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);

      console.log(res);

      alert("User Registered Successfully");
    } catch (err) {
      console.log(err.response?.data || err.message);

      alert("Registration Failed");
    }
  };

  return (
    <div className="Register-form">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

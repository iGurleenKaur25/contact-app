import { useState } from "react";
import axios from "axios";

function ContactForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.post("https://contact-backend.onrender.com/api/contacts", form);
    setSuccess("Contact added successfully");
    setForm({ name: "", email: "", phone: "", message: "" });
    onAdd();
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h5 className="mb-3">Add Contact</h5>

      {success && (
        <div className="alert alert-success py-2">
          {success}
        </div>
      )}

      <form onSubmit={submitForm}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <textarea
          className="form-control mb-3"
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100">
          Add Contact
        </button>
      </form>
    </div>
  );
}

export default ContactForm;

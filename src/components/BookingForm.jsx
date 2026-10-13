import { useState } from "react";

const today = new Date().toISOString().split("T")[0];

const initial = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  note: "",
};

export default function BookingForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Naam daalo";
    if (!/^[6-9]\d{9}$/.test(form.phone)) err.phone = "Sahi 10 digit mobile number daalo";
    if (!form.date) err.date = "Date chuno";
    if (!form.time) err.time = "Time chuno";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      // Abhi sirf frontend hai, isliye data console me dikh raha hai.
      // Baad me yahan API call (fetch/axios) laga sakte ho.
      console.log("Booking:", form);
      setSubmitted(form);
      setForm(initial);
    }
  };

  if (submitted) {
    return (
      <div className="form-card success">
        <div className="success-icon">✅</div>
        <h3>Booking Request Received!</h3>
        <p>
          Thank you <strong>{submitted.name}</strong>! Aapka table{" "}
          <strong>{submitted.guests}</strong> guests ke liye{" "}
          <strong>{submitted.date}</strong> ko <strong>{submitted.time}</strong> par
          request ho gaya hai. Hum jaldi hi confirm karenge.
        </p>
        <button className="btn" onClick={() => setSubmitted(null)}>
          Nayi Booking
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="field">
          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Aapka naam" />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="field">
          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="10 digit mobile number" maxLength={10} />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label>Date</label>
          <input type="date" name="date" min={today} value={form.date} onChange={handleChange} />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>
        <div className="field">
          <label>Time</label>
          <input type="time" name="time" value={form.time} onChange={handleChange} />
          {errors.time && <span className="error">{errors.time}</span>}
        </div>
        <div className="field">
          <label>Guests</label>
          <select name="guests" value={form.guests} onChange={handleChange}>
            {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label>Special Request (optional)</label>
        <textarea name="note" rows="3" value={form.note} onChange={handleChange} placeholder="Birthday, window seat, etc." />
      </div>

      <button type="submit" className="btn btn-block">
        Book Table
      </button>
    </form>
  );
}

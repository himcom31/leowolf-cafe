import BookingForm from "../components/BookingForm.jsx";

export default function Booking() {
  return (
    <>
      <section className="page-header">
        <h1>Book a Table</h1>
        <p>Apni seat pehle se reserve kar lo</p>
      </section>

      <section className="section">
        <div className="container narrow">
          <BookingForm />
        </div>
      </section>
    </>
  );
}

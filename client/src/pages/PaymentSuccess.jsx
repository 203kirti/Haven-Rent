import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const [message, setMessage] = useState("Finalizing booking...");

  useEffect(() => {
    const createBooking = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/stripe/session-details/${sessionId}`
        );
        const session = await response.json();

        const res = await fetch("http://localhost:3001/bookings/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId: session.metadata.customerId,
            hostId: session.metadata.hostId,
            listingId: session.metadata.listingId,
            startDate: session.metadata.startDate,
            endDate: session.metadata.endDate,
            totalPrice: session.metadata.price,
          }),
        });

        const result = await res.json();
        console.log("Booking creation result:", result);

        if (res.ok) {
          navigate(`/${session.metadata.customerId}/trips`);
        } else {
          setMessage("Booking creation failed. Please contact support.");
        }
      } catch (error) {
        console.log("Error finalizing booking:", error);
        setMessage("Something went wrong. Please try again.");
      }
    };

    if (sessionId) createBooking();
  }, [sessionId, navigate]);

  return <h2>{message}</h2>;
};

export default PaymentSuccess;

const router = require("express").Router()

const Booking = require("../models/Booking")

console.log("commit");
/* CREATE BOOKING */
router.post("/create", async (req, res) => {
    try {
        const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body
        const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice })
        await newBooking.save()
        res.status(200).json(newBooking)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "Fail to create a new Booking!", error: err.message })
    }
})

// Get all booked date ranges for a listing
router.get("/booked-dates/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const bookings = await Booking.find({ listingId });

    const bookedRanges = bookings.map((booking) => ({
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
    }));

    res.status(200).json(bookedRanges);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch booked dates", error: err.message });
  }
});


module.exports = router
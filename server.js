const express = require('express');
const app = express();

app.use(express.json()); 
let bookings = [];

app.get('/api/bookings', (request, response) => {
    response.status(200).json(bookings);
});

app.post('/api/bookings', (request, response) => {
    const { name, email, phone, eventName } = request.body;

    if (!name || !email || !phone || !eventName) {
        return response.status(400).json({ message: 'All fields are required' });
    }

    const newBooking = {
        id: bookings.length + 1,
        name,
        email,
        phone,
        eventName
    };

    bookings.push(newBooking);
    response.status(201).json({ message: 'Booking created successfully', booking: newBooking });
});

app.get('/api/bookings/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const booking = bookings.find(b => b.id === id);

    if (!booking) {
        return response.status(404).json({ message: 'Booking not found' });
    }

    response.status(200).json(booking);
});

app.put('/api/bookings/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const booking = bookings.find(b => b.id === id);

    if (!booking) {
        return response.status(404).json({ message: 'Booking not found' });
    }

    const { name, email, phone, eventName } = request.body;

    if (name) booking.name = name;
    if (email) booking.email = email;
    if (phone) booking.phone = phone;
    if (eventName) booking.eventName = eventName;

    response.status(200).json({ message: 'Booking updated successfully', booking });
});


app.delete('/api/bookings/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const index = bookings.findIndex(b => b.id === id);

    if (index === -1) {
        return response.status(404).json({ message: 'Booking not found' });
    }

    const deleted = bookings.splice(index, 1);
    response.status(200).json({ message: 'Booking cancelled successfully', deleted });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Synergia Event Booking API running at http://localhost:${PORT}`);
});

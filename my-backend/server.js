const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware Setup
app.use(cors());          // Frontend kooda connect panna allow pannum
app.use(express.json());  // Frontend-la irunthu vara JSON data-va read panna

// MongoDB Connection String
const mongoURI = 'mongodb://0.0.0.0:27017/my_database'; 

mongoose.connect(mongoURI)
.then(() => console.log('MongoDB successfully connected!'))
.catch((err) => console.error('MongoDB connection error:', err));

// Database User Structure (Schema)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

// Basic GET Route (Server working-ah nu check panna)
app.get('/', (req, res) => {
    res.send('Backend & MongoDB Connected Successfully!');
});

// Data-va Database-la Save Panna Oru POST Route (API Endpoint)
app.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json({ message: 'User data saved successfully!', data: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Data save panna mudiyala!', details: error.message });
    }
});

// Server-ah running la veika
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
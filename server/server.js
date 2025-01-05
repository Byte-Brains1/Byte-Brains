const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventsRouter = require('./Events');
const teammatesRouter = require('./Teammates');
const imageRouter = require('./Image'); // Import the Image  
const breakingNewsRouter = require('./BreakingNews'); // Import the Breaking News router
const contactRouter = require('./contact'); // Import the Breaking News router
// const config = require('./config');

require('dotenv').config();
// const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL || 8000;




const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  // .connect(`mongodb://localhost:27017/byteBrain`, {
  .connect(`${MONGODB_URL}/byteBrain`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the app if the database is not connected
  });

// Routes
app.use('/events', eventsRouter);
app.use('/teammates', teammatesRouter);
app.use('/images', imageRouter); // Add the image routes
app.use('/news', breakingNewsRouter);
app.use('/contacts', contactRouter);

// Start the server

app.get('/',(req,res)=>{
  res.send("server is running");
})
const PORT = process.env.SERVER_PORT;
// const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // res.send("This server");
});

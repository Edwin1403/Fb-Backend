const express = require('express');
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

// const mongoose = require('mongoose');
const cors = require('cors');
const { readdirSync } = require('fs');
const router = require('./routes/user');
const app = express();
// const dotenv = require('dotenv');
// dotenv.config();

connectDB();

app.use(express.json());
app.use(cors());
app.use(cors())
app.use(router)

// const userRoutes = require("./routes/user");
// app.use("/", userRoutes)

// routes
readdirSync('./routes').map((r) => app.use('/', require("./routes/" + r)));

// database
// mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
// })
// .then(()=> console.log("database Connected Successfully"))
// .catch((error)=> console.log("connection error",error));


app.listen(5000, () => {
    console.log(`Server is Listenening on ${PORT}`);
})
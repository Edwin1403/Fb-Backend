const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { readdirSync } = require('fs');
dotenv.config();


const app = express();
app.use(cors());
app.use(cors())

// const userRoutes = require("./routes/user");
// app.use("/", userRoutes)

// routes
readdirSync('./routes').map((r) => app.use('/', require("./routes/" + r)));

// database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
})
.then(()=> console.log("database Connected Successfully"))
.catch((error)=> console.log("database", error));

const PORT = process.env.PORT || 5000
app.listen(5000, () => {
    console.log(`Server is Listenening on ${PORT}`);
})
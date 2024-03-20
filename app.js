const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = 4001;

// const db = mongoose.connect("mongodb://127.0.0.1/urbanservice");

const db = mongoose.connect("mongodb+srv://rahulbayad05:Rahul%400508@cluster0.oipkibr.mongodb.net/urbanservice")
db.then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log(err)
})

//config
app.use(express.json());
app.use(cors());
//require all routes...
const categoryRoutes = require("./routes/CategoryRoutes")
const roleRoutes = require("./routes/RoleRoutes")
const serviceProviderRoutes = require("./routes/ServiceProviderRoutes")
const serviceRoutes = require("./routes/ServiceRoutes")
const subCategoryRoutes = require("./routes/SubCategoryRoutes")
const typeRoutes = require("./routes/TypeRoutes")
const userRoutes = require("./routes/UserRoutes")
const userHistoryRoutes = require("./routes/UserHistoryRoutes")
const servProHistoryRoutes = require("./routes/ServProHistoryRoutes")

//provinding to server all routes...
app.use("/category",categoryRoutes);
app.use("/role",roleRoutes)
app.use("/serviceprovider",serviceProviderRoutes);
app.use("/service",serviceRoutes)
app.use("/subcategory",subCategoryRoutes)
app.use("/type",typeRoutes)
app.use("/user",userRoutes)
app.use("/userhistory",userHistoryRoutes)
app.use("/servprohistory",servProHistoryRoutes)

app.listen(PORT,()=>{
    console.log(`Server connected to PORT ${PORT}`)
})
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
 
app.use(cors());

const allRoutes = require("./routes");
const db = require("./db");

db.then(() => {
    console.log('berhasil connect ke db')
}).catch(() => {
    console.log("gagal connect ke db");
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(allRoutes);

app.listen(PORT, () => {
    console.log("server running on PORT" + PORT);
})
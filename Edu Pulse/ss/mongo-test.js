


import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://makampremkumar59_db_user:MPrem%4026092004@edupulse.4gtlrtl.mongodb.net/edupulse",
  { serverSelectionTimeoutMS: 15000 }
)
.then(() => {
  console.log("🎉 MongoDB Connected Successfully");
  process.exit(0);
})
.catch(err => {
  console.error("❌ MongoDB Error:", err);
});

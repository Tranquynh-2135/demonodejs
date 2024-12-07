const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Import bcrypt
const User = require("./models/User");

const app = express();
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect("mongodb://localhost:27017/your_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    addTestUser(); // Gọi hàm thêm user sau khi kết nối thành công
  })
  .catch((err) => console.log(err));

// Thêm user mẫu vào database
async function addTestUser() {
  try {
    const hashedPassword = await bcrypt.hash("password123", 10); // Mã hóa mật khẩu
    const user = new User({
      username: "user1",
      password: hashedPassword,
    });
    await user.save();
    console.log("Test user added");
  } catch (err) {
    console.error("Error adding test user:", err);
  }
}

// Server lắng nghe
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

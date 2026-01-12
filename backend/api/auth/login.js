const connectDB = require('../../lib/db');
const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    await connectDB(); // 🔥 THIS IS REQUIRED

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

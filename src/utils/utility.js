const bcrypt = require("bcryptjs");

exports.encryptedPassword = async (password) => {
    // 3️⃣ Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

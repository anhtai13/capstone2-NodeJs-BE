import getConnection from "./src/config/connection.database.js";
import bcrypt from 'bcryptjs';
const connection = getConnection();

const SALT_ROUNDS = 10;

export { SALT_ROUNDS };
const encryptPassword = (value) => {
  return bcrypt.hashSync(value, SALT_ROUNDS);
};

const comparePassword = (value, encryptValue) => {
  return bcrypt.compareSync(value, encryptValue);
};
const adminUser = {
    username: "user3",
    email: "User3@mail.com",
    first_name: "",
    last_name: "",
    password: encryptPassword("Password123@"),
    role_id:    3,
    avatar: "",
    status: "1",
    address_user: "DN",
    phone_number: "012381239",
    created_at: "2024-3-2 12:12:12",
    created_by_id: 0,
    updated_at: "2024-3-2 12:12:12",
    updated_by_id: 0,
};

connection.query("INSERT INTO users SET ?", adminUser, (error, result) => {
    if (error) {
        console.log("Error:", error);
    } else {
        console.log("Successed");
    }
});

connection.end();
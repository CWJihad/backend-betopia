import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    const isUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (isUser) {
      return res.status(409).json({ message: "User Already Exist!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(202).json({
      user,
      message: "User successfully created",
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Failed to create an user: ",
      error,
    });
  }
};

const readUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400, "Invalid Password");
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Failed to update an user: ",
      error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, password, newPassword } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    if (!fullName && !password && !newPassword) {
      return res.status(401).json({ message: "Value empty!" });
    }

    if (password || newPassword) {
      if (newPassword && !password) {
        return res
          .status(400)
          .json({ message: "Enter your current password!" });
      }

      if (!newPassword && password) {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid Password!" });
        }

        return res.status(400).json({ message: "Enter your new password!" });
      }

      const hashNewPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashNewPassword;
      await user.save();
    }

    user.fullName = fullName;

    await user.save();

    return res.status(200).json({
      user,
      message: "User successfully updated",
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Failed to update an user: ",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    return res.status(200).json({
      message: "User successfully deleted"
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Failed to delete an user: ",
      error: error.message,
    });
  }
};

export { createUser, readUser, updateUser, deleteUser };

import AutismContact from "../models/autismContactModel.js";

// 📌 Create Contact
export const autismCreateContact = async (req, res) => {
  try {
    const { fullName, email, phone, address, message } = req.body;

    if (!fullName || !email || !phone || !address || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const contact = await AutismContact.create({
      fullName,
      email,
      phone,
      address,
      message,
    });

    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Get All Contacts (Admin)
export const autismGetContacts = async (req, res) => {
  try {
    const contacts = await AutismContact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Delete Contact
export const autismDeleteContact = async (req, res) => {
  try {
    await AutismContact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
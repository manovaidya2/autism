import express from "express";

const router = express.Router();

router.post("/kraya-lead", async (req, res) => {
  try {
   const { name, phone, email, notes, stage, pipeline } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone required",
      });
    }

    const cleanPhone = String(phone).replace(/\D/g, "");
    const last10Digits = cleanPhone.slice(-10);

    if (last10Digits.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Valid 10 digit phone required",
      });
    }

  const payload = {
  name: name.trim(),
  phone: `+91${last10Digits}`,
  email: email || "",
  notes: notes || "",
  stage: stage || "New Lead",
  pipeline: pipeline || "Leads",
};
    console.log("KRAYA FINAL PAYLOAD:", payload);

    const response = await fetch(
      "https://api.kraya-ai.com/api/external/6Vjm8XVH/leads",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-KRAYA-API-KEY": "NhzO4pFQNtrqwa4e",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    console.log("KRAYA RESPONSE:", data);

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data?.message || "Kraya lead submit failed",
        kraya: data,
      });
    }

    return res.status(200).json({
      success: true,
      message: data?.message || "Lead submitted successfully",
      lead_id: data?.lead_id,
      kraya: data,
    });
  } catch (error) {
    console.log("KRAYA ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;
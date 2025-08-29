// api-grade/grade.js

export default async function handler(req, res) {
  // Chỉ cho phép POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { answer, expected } = req.body;

    if (!answer || !expected) {
      return res.status(400).json({ error: "Missing 'answer' or 'expected' field." });
    }

    // Chấm điểm: so sánh đơn giản
    let score = 0;
    let feedback = "";

    if (answer.trim().toLowerCase() === expected.trim().toLowerCase()) {
      score = 100;
      feedback = "✅ Chính xác!";
    } else {
      score = 50;
      feedback = `❌ Sai, đáp án đúng là: ${expected}`;
    }

    // Trả kết quả JSON
    return res.status(200).json({
      success: true,
      score,
      feedback,
      yourAnswer: answer,
      expectedAnswer: expected
    });

  } catch (error) {
    console.error("Error grading:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

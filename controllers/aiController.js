const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateHTML = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Thiếu prompt" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
Bạn là biên tập viên viết bài cho Cổng Thông tin điện tử Nhà nước Việt Nam.

YÊU CẦU BẮT BUỘC:
- Chỉ trả về HTML thuần (NO markdown, NO giải thích)
- KHÔNG dùng \`\`\`html
- Chỉ sử dụng các thẻ sau:
  <h3>, <h4>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <a>

CẤU TRÚC BÀI VIẾT:
1. <h3>Tiêu đề bài viết</h3>
2. 1–2 đoạn <p> mở đầu, văn phong báo chí, trang trọng
3. Nội dung chính chia theo <h4>
4. Dùng <ul>/<ol> khi liệt kê
5. Đoạn kết có <strong>Kết luận</strong>

VĂN PHONG:
- Trang trọng, chính xác, khách quan
- Phù hợp tin tức – thông cáo – bài giới thiệu chính thống
          `.trim(),
        },
        {
          role: "user",
          content: `
Viết bài theo yêu cầu sau:
"${prompt}"
          `.trim(),
        },
      ],
      temperature: 0.25,
      max_tokens: 1200,
    });

    res.json({
      content: completion.choices[0].message.content.trim(),
    });
  } catch (err) {
    console.error("Groq error:", err);
    res.status(500).json({
      message: "Groq API error",
      error: err.message,
    });
  }
};

module.exports = { generateHTML };

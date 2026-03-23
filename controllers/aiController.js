const { OpenAI } = require("openai");
const newsModel = require("../models/newsModel");

const client = new OpenAI({
  baseURL: "http://127.0.0.1:8045/v1",
  apiKey: "sk-4a02b88bd1dd4eacb072351ae94298c0",
});

const generateHTML = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Thiếu prompt" });
    }

    const completion = await client.chat.completions.create({
      model: "gemini-3-flash",
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
    console.error("OpenAI error:", err);
    res.status(500).json({
      message: "OpenAI API error",
      error: err.message,
    });
  }
};

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Thiếu câu hỏi (message)" });
    }

    // 1. Fetch recent news
    const recentNews = await newsModel.getRecentNewsContext();
    
    // 2. Format context
    let contextText = "Dưới đây là các tin tức mới nhất từ hệ thống để làm thông tin tham khảo:\n";
    if (recentNews && recentNews.length > 0) {
      recentNews.forEach((news, idx) => {
        contextText += `\n${idx + 1}. [${news.Title}]\n   Tóm tắt: ${news.Summary}\n`;
      });
    } else {
      contextText += "Không có tin tức nào nổi bật gần đây.\n";
    }

    // 3. Send to AI
    const completion = await client.chat.completions.create({
      model: "gemini-3-flash",
      messages: [
        {
          role: "system",
          content: `Bạn là trợ lý ảo AI thông minh và thân thiện của website tin tức này.
Nhiệm vụ của bạn là trả lời các câu hỏi của người dùng. Nếu câu hỏi liên quan đến tin tức, hãy ưu tiên dùng thông tin từ Danh sách tin tức phía dưới để trả lời.
KHÔNG tự bịa ra thông tin tin tức. Trả lời một cách khách quan, chính xác, ngắn gọn và dễ hiểu. Giữ tông giọng lịch sự, sẵn sàng giúp đỡ.

${contextText}`
        },
        { role: "user", content: message }
      ],
      temperature: 0.3,
      max_tokens: 800,
    });

    res.json({
      reply: completion.choices[0].message.content.trim(),
    });
  } catch (err) {
    console.error("OpenAI Chat error:", err);
    res.status(500).json({
      message: "Lỗi phản hồi từ AI",
      error: err.message,
    });
  }
};

module.exports = { generateHTML, chatWithAI };

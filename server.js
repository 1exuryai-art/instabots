import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const PORT = process.env.PORT || 3000;

app.post("/api/lead", async (req, res) => {
  try {
    const body = req.body;

    const name = body.contact?.name || "—";
    const usernameRaw = body.contact?.telegramUsername || "";
    const username = usernameRaw.replace(/^@/, "");
    const consent = body.consent ? "Да" : "Нет";

    const answersText = (body.answers || [])
      .map((item, i) => `${i + 1}. ${item.question}\nОтвет: ${item.answer}`)
      .join("\n\n");

    const text = [
      "Новая заявка из анкеты",
      "",
      `Имя: ${name}`,
      `Telegram: @${username}`,
      `Согласие: ${consent}`,
      body.score ? `Score: ${body.score}` : "",
      body.verdict ? `Вердикт: ${body.verdict}` : "",
      "",
      answersText,
    ]
      .filter(Boolean)
      .join("\n");

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
      }),
    });

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      console.error("Telegram error:", errText);
      return res.status(500).json({ ok: false, error: "telegram_send_failed" });
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ ok: false, error: "server_error" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});

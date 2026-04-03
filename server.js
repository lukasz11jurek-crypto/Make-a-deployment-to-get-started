import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post("/voice", (req, res) => {
  res.set("Content-Type", "text/xml");

  res.send(`
    <Response>
      <Say voice="Polly.Joanna" language="pl-PL">
        Dzień dobry! Tu wirtualna recepcja. W czym mogę pomóc?
      </Say>
    </Response>
  `);
});

app.get("/", (req, res) => {
  res.send("AI działa 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server działa na porcie " + PORT);
});

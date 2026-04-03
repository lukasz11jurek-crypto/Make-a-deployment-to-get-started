import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.post("/voice", (req, res) => {
  res.type("text/xml");
  res.send(`
    <Response>
      <Say>Hello from AI</Say>
    </Response>
  `);
});

app.get("/", (req, res) => {
  res.send("AI działa 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);

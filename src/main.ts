import Express from "express";
import helmet from "helmet";
const app = Express();
const port = 3000;
// セキュリティ対策
app.use(helmet());

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {});

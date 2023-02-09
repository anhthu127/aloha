import express, { Request, Response } from "express";
import { codesePool, query } from "./configs/database.config";
import http from "http";

const router = express.Router();

const app = express();
app.use(router);

const server = http.createServer(app);

const getStockTransaction = async (stockCode) => {
  const sql = `select * from StockPrice where code='${stockCode}'`;
  const result = await query(codesePool, sql);
  return result;
};
router.get("/api/stock-chart-data", async (req: Request, res: Response) => {
  const { code } = req.body;
  const result = await getStockTransaction(code);
  res.send({
    code: 1,
    data: result,
  });
});

server.listen(3003, () => {
  console.log("*:3003");
});
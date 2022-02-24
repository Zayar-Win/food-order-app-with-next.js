import Products from "../../../models/Products";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    const products = await Products.find();
    res.status(200).json(products);
  }

  if (method === "POST") {
    try {
      const product = await Products.create(
        req.body
      );
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

import Products from "../../../models/Products";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
  const {
    method,
    query: { productId },
  } = req;

  dbConnect();

  if (method === "GET") {
    const product = await Products.findById(
      productId
    );
    res.status(200).json(product);
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
  if (method === "DELETE") {
    await Products.findByIdAndDelete(productId);
    res
      .status(200)
      .json("The product have been deleted!");
  }
}

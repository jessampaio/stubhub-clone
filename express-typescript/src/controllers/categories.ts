import { connection } from "../database";
import { type Request, type Response } from "express";

export async function getCategories(req: Request, res: Response) {
  try {
    const conn = await connection;
    const [data]: any = await conn.execute(`SELECT * FROM categories`);
    if (data) {
      return res.send(data);
    }
  } catch (err) {
    if (err != null) {
      return res.status(500).json(err);
    }
  }
}

export async function addCategory(req: Request, res: Response) {
  try {
    if (!req.body.categoryName) {
      return res.status(400).send("Enter a valid category name.");
    }
    const conn = await connection;
    await conn.execute(`INSERT INTO categories (category_name) VALUES (?)`, [
      req.body.categoryName,
    ]);
    const [data]: any = await conn.execute(
      `SELECT * FROM categories WHERE category_name = ?`,
      [req.body.categoryName]
    );
    if (data) {
      return res.status(200).json(data[0]);
    }
  } catch (err: any) {
    if (err?.errno === 1062) {
      return res.status(409).send("This category has already been added.");
    }
    if (err != null) {
      return res.status(500).json(err);
    }
  }
}

export async function getCategory(req: Request, res: Response) {
  try {
    const conn = await connection;
    const [data]: any = await conn.execute(
      `SELECT * FROM categories WHERE category_id = ?`,
      [req.params.id]
    );
    if (data === 0) {
      return res.status(200).send("No category has been added yet.");
    }
  } catch (err) {
    if (err != null) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const conn = await connection;
    const [data]: any = await conn.execute(
      `UPDATE categories SET category_name = ? WHERE category_id = ?`,
      [req.params.id]
    );
    if (data.affectedRows === 0) {
      return res.status(404).send("This category doesn't exist.");
    }
    return res.send("Category has been updated succesfully.");
  } catch (err) {
    if (err != null) {
      return res.json(err);
    }
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const conn = await connection;
    const [data]: any = await conn.execute(
      `DELETE FROM categories WHERE category_id = ?`,
      [req.params.id]
    );
    if (data.length === 0) {
      return res.status(200).send("This category doesn't exist.");
    }
    return res.send("Category has been deleted successfully.");
  } catch (err) {
    if (err != null) {
      return res.json(err);
    }
  }
}

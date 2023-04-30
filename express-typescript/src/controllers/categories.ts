import database from '../database'
import { connection } from '../database'
import { type Request, type Response } from 'express'

export async function getCategories (req: Request, res: Response) {
  try {
    const conn = await connection
    const [data]: any = await conn.execute(`SELECT * FROM categories`)
    if (data) {
      return res.send(data)
    }
  } catch (err) {
    if (err != null) {
      return res.status(500).json(err)
    }
  }
}

export function addCategory (req: Request, res: Response) {
  const addCategoryQuery = 'INSERT INTO categories (category_name) VALUES (?);'

  if (!req.body.categoryName) {
    return res.status(400).send('Enter a valid category name.')
  }

  database.query(addCategoryQuery, [req.body.categoryName], (err, data) => {
    if (err?.errno === 1062) {
      return res.status(409).send('This category has already been added.')
    }
    if (err != null) {
      return res.status(500).json(err)
    }

    database.query('SELECT * FROM categories WHERE category_name = ?', req.body.categoryName, (err, data: any) => {
      if (err != null) {
        return res.status(500).json(err)
      }
      return res.status(200).json(data[0])
    })
  })
}

export function getCategory (req: Request, res: Response) {
  const getCategoryQuery = 'SELECT * FROM categories WHERE category_id = ?'

  database.query(getCategoryQuery, [req.params.id], (err, data: any) => {
    if (data === 0) {
      return res.status(200).send('No category has been added yet.')
    }
    if (err != null) {
      console.log(err)
      return res.status(500).json(err)
    }
  })
}

export function updateCategory (req: Request, res: Response) {
  const updateCategoryQuery = 'UPDATE categories SET category_name = ? WHERE category_id = ?'

  database.query(updateCategoryQuery, [req.params.id], (err, data: any) => {
    if (err != null) {
      return res.json(err)
    }
    if (data.affectedRows === 0) {
      return res.status(404).send("This category doesn't exist.")
    }
    return res.send('Category has been updated succesfully.')
  })
}

export function deleteCategory (req: Request, res: Response) {
  const deleteCategoryQuery = 'DELETE FROM categories WHERE category_id = ?'

  database.query(deleteCategoryQuery, [req.params.id], (err, data: any) => {
    if (data.length === 0) {
      return res.status(200).send("This category doesn't exist.")
    }
    if (err != null) {
      return res.json(err)
    }
    return res.send('Category has been deleted successfully.')
  })
}

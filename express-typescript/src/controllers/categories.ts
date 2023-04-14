import database from '../database'
import { type Request, type Response } from 'express'

export function getCategories (req: Request, res: Response) {
  const getCategoriesQuery = 'SELECT * FROM categories'

  database.query(getCategoriesQuery, (err, data: any) => {
    if (err != null) {
      return res.status(500).json(err)
    }
    return res.send(data)
  })
}

export function addCategory (req: Request, res: Response) {
  const addCategoryQuery = 'INSERT INTO categories (`category_name`) VALUES (?)'

  if (!req.body.category_name) {
    return res.status(400).send('Enter a valid category name.')
  }

  database.query(addCategoryQuery, [req.body.category_name], (err, data) => {
    console.log(req.body.category_name)
    if (err?.errno === 1062) {
      return res.status(409).send('This category has already been added.')
    }
    if (err != null) {
      console.log(err)
      return res.status(500).json(err)
    }
    return res.status(200).send('Category has been added successfully.')
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
  const updateCategoryQuery = 'UPDATE categories SET `category_name` = ? WHERE category_id = ?'

  database.query(updateCategoryQuery, [req.params.id], (err, data: any) => {
    if (err != null) {
      return res.json(err)
    }
    if (data.affectedRows === 0) {
      console.log(data)
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
      console.log(err)
      return res.json(err)
    }
    return res.send('Category has been deleted successfully.')
  })
}

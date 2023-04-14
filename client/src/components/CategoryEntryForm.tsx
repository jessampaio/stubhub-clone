import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const CategoryEntryForm = (props: any) => {
  const [categories, setCategories] = useState([])

  const getCategories = () => {
    axios.get('http://localhost:3345/categories')
      .then(function (response) {
        if (response.data.length) {
          setCategories(response.data)
        }
      })
      .catch(function (err) {
        console.log('There was an error.')
        throw err
      })
  }

  useEffect(() => getCategories(), [])

  const defaultCategory = { category_id: null, category_name: 'Select a category' }
  const dropdownItem = [defaultCategory, ...categories].map((category: Record<string, any>) => (

    <option key={category.category_id} value={category.category_id}>
      {category.category_name}
    </option>)
  )

  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)

  const [categoryName, setCategoryName] = useState('')

  const handleChange = (event: any) => {
    setCategoryName(event.target.value)
    console.log(event.target.value)
  }

  const [err, setErr] = useState<any>({})

  const handleClose = () => {
    setShow(false)
    setErr({})
  }

  const handleClick = (event: any) => {
    event.preventDefault()
    axios.post('http://localhost:3345/categories', { category_name: categoryName })
      .then(data => {
        setShow(false)
        getCategories()
      })
      .catch((err: AxiosError) => setErr(err))
  }

  console.log('DROP: ', dropdownItem, categories)

  return (
      <>
        <Form.Select aria-label="Select a category" onChange={props.handleSelect}>
            {dropdownItem.length ? dropdownItem : null}
        </Form.Select>

        <Button variant="primary" onClick={handleShow}>
        Add new Category
        </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton onHide={handleClose}>
          <Modal.Title>Add new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="categoryName">
              <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" name="newCategory" onChange={handleChange} placeholder="Enter category name" />
                  {err.response && <span>{err.response.data}</span>}
            </Form.Group>
                <Button variant="primary" type="submit" onClick={handleClick}>
                  Add new category
                </Button>
          </Form>
        </Modal.Body>
      </Modal>

      </>

  )
}

export default CategoryEntryForm

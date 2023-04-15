import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

interface Props {
  handleSelect: (event: any) => void;
  value: number | string;
}

const CategoryEntryForm = (props: Props) => {
  const [categoriesSelectOptions, setCategoriesSelectOptions] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [err, setErr] = useState<any>({})

  const getCategories = () => {
    axios.get('http://localhost:3345/categories')
      .then(function (response) {
        if (response.data.length) {
          const options = response.data.map((category: Record<string, any>) => (
          <option key={category.category_id} value={category.category_id}>
            {category.category_name}
          </option>)
          )
          setCategoriesSelectOptions(options)
        }
      })
      .catch(function (err) {
        console.log('There was an error.')
        throw err
      })
  }

  getCategories()

  const handleChange = (event: any) => {
    setCategoryName(event.target.value)
    console.log(event.target.value)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setErr({})
  }

  const handleAddNewCategory = (event: any) => {
    event.preventDefault()
    axios.post('http://localhost:3345/categories', { categoryName })
      .then(data => {
        setShowModal(false)
        getCategories()
      })
      .catch((err: AxiosError) => setErr(err))
  }

  return (
      <>
        <Form.Select aria-label="Select a category" value={props.value} onChange={props.handleSelect}>
            <option>Choose a category</option>
            {categoriesSelectOptions}
        </Form.Select>

        <Button variant="primary" onClick={() => setShowModal(true)}>
        Add new Category
        </Button>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton onHide={handleCloseModal}>
          <Modal.Title>Add new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="categoryName">
              <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" name="newCategory" onChange={handleChange} placeholder="Enter category name" />
                  {err.response && <span>{err.response.data}</span>}
            </Form.Group>
                <Button variant="primary" type="submit" onClick={handleAddNewCategory}>
                  Add new category
                </Button>
          </Form>
        </Modal.Body>
      </Modal>
      </>
  )
}

export default CategoryEntryForm

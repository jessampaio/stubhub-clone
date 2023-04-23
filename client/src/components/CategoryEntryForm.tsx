import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { Select } from '@chakra-ui/react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

interface Props {
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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

  useEffect(() => {
    getCategories()
  })

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
        <Select aria-label="Select a category" value={props.value} onChange={props.handleSelect}>
            <option>Choose a category</option>
            {categoriesSelectOptions}
        </Select>
        <Button onClick={() => setShowModal(true)}>Add Category</Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
                <FormLabel>Category Name</FormLabel>
                  <Input type="text" name="newCategory" onChange={handleChange} placeholder="Enter category name" />
                    {err.response && <span>{err.response.data}</span>}
                  <Button type="submit" onClick={handleAddNewCategory}>
                    Add new category
                  </Button>
            </FormControl>
          </ModalBody>
          </ModalContent>
          </Modal>


      </>
  )
}

export default CategoryEntryForm

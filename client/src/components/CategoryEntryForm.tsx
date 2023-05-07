import axios, { AxiosError } from 'axios'
import React, { ReactNode, useEffect, useState } from 'react'
import {
  Select,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormErrorMessage,
  HStack
} from '@chakra-ui/react'

interface Props {
  handleStateChange: (key: string, value: string) => void;
  value: number | string;
}

interface CategoryData {
  category_id: number;
  category_name: string;
}

const CategoryEntryForm = (props: Props) => {
  const [categoriesSelectOptions, setCategoriesSelectOptions] = useState<
    ReactNode[]
  >([])
  const [categoryName, setCategoryName] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const getCategories = () => {
    axios
      .get('http://localhost:3345/categories')
      .then(function (response) {
        if (response.data.length) {
          const options = response.data.map((category: CategoryData) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))
          setCategoriesSelectOptions(options)
        }
      })
      .catch(function (err) {
        console.log('There was an error getting Categories.')
        throw err
      })
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
    console.log(categoryName)
  }

  const handleAddNewCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    axios
      .post('http://localhost:3345/categories', { categoryName })
      .then((response) => {
        setShowModal(false)
        props.handleStateChange('categoryId', response.data.category_id)
        getCategories()
      })
      .catch((err: AxiosError) =>
        setErrorMessage((err?.response?.data as string) || 'Unknown error.')
      )
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.handleStateChange('categoryId', event.target.value)
  }

  return (
    <>
      <HStack justifyContent={'space-between'} mb={'10px'}>
        <Select
          aria-label="Select a category"
          value={props.value}
          onChange={handleSelect}
        >
          <option>Choose a category</option>
          {categoriesSelectOptions}
        </Select>
        <Button onClick={() => setShowModal(true)}>Add Category</Button>
      </HStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={Boolean(errorMessage)}>
              <FormLabel>Category Name</FormLabel>
              <Input
                width={'250px'}
                type="text"
                name="newCategory"
                onChange={handleChange}
                placeholder="Enter category name"
              />
              {errorMessage && (
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
              )}
              <Button mt={'10px'} type="submit" onClick={handleAddNewCategory}>
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

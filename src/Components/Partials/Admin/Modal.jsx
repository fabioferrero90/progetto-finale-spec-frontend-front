import React from 'react'
import DeleteProduct from './ModalContents/DeleteProduct'
import EditProduct from './ModalContents/EditProduct'
import AddProduct from './ModalContents/AddProduct'

const Modal = ({ type, product, closeModal }) => {

    switch (type) {
        case 'edit':
            return (
                <EditProduct
                    product={product}
                    closeModal={closeModal}
                />
            )
        case 'delete':
            return (
                <DeleteProduct
                    product={product}
                    closeModal={closeModal}
                />
            )
        case 'addproduct':
            return (
                <AddProduct
                    closeModal={closeModal}
                />
            )
    }
}

export default React.memo(Modal)

import chevron from '../../../Assets/Icons/chevron_right-24px.svg';
import edit from '../../../Assets/Icons/edit-24px.svg';
import deleteBtn from '../../../Assets/Icons/delete_outline-24px.svg';
import './InventoryCard.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useState} from 'react';
import DeleteInventoryModal from '../../DeleteInventoryModal/DeleteInventoryModal';

export default function InventoryCard({item, onDelete}) {
    const navigate = useNavigate();
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false)

    const handleEditClick = () => {
    navigate("/Editinventory",{ state: { item } });
    };

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true)
    }

    const handleDeleteConfirm = async () => {
        try {
            await onDelete(item.id)

        } catch (error) {
            console.error('Failed to delete the item:', error)
        } finally {
            setIsDeleteModalOpen(false)
        }
    }
      
    return (
        <>
            <section className='inventory-card'>
                <div className="inventory-card__list-container">
                        <div className="inventory-card__container-info">
                            <h4 className="inventory-card__header">Inventory Item</h4>
                            <Link className="inventory-card__inventory-link" to={`/inventory/${item.id}`}>
                                <div className="inventory-card__inventory-item">
                                    <p className="inventory-card__item">{item.item_name}</p> 
                                    <img  src={chevron} alt='chevron' />
                                </div>
                            </Link>
                            <h4 className="inventory-card__header">CATEGORY</h4>
                        <p className="inventory-card__item">{item.category}</p>
                        </div>
                        <div className="inventory-card__container-info inventory-card__container-info--inactive ">
                            <div className='inventory-card__status-container'>
                                <h4 className="inventory-card__header">Status</h4>
                                <p className={`inventory-card__item-status ${item.status === 'Out of Stock' ? 'inventory-card__item-status--out-of-stock' : ''}`}>
                                    {item.status.toUpperCase()}
                                </p>
                            </div>
                            <h4 className="inventory-card__header">QTY</h4>
                            <p className="inventory-card__item inventory-card__item--active">{item.quantity}</p>
                            <h4 className="inventory-card__header">WAREHOUSE</h4>
                            <p className="inventory-card__item inventory-card__item--active" >{item.warehouse_name}</p>
                        </div>
                    <div className="inventory-card__icons inventory-card__icons--tablet">
                        <img className="inventory-card__edit" src={deleteBtn} alt="delete button" onClick={handleDeleteClick} />
                        <img className="inventory-card__edit" src={edit} alt="Edit Warehouse" onClick={handleEditClick}/>
                    </div>
                </div>
                <div className="inventory-card__icons inventory-card__icons--mobile">
                        <img className="inventory-card__edit" src={deleteBtn} alt="delete button" onClick={handleDeleteClick} />
                        <img className="inventory-card__edit" src={edit} alt="Edit Warehouse"  onClick={handleEditClick}/>
                </div>
            </section>
            <DeleteInventoryModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteConfirm}
                itemName={item.item_name}
            />
    </>
 
  );
}

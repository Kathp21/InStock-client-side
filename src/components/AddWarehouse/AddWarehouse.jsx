import './AddWarehouse.scss';
import back from '../../Assets/Icons/arrow_back-24px.svg';
import { useRef } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function AddWarehouse() {

    const { REACT_APP_API_BASE_PATH } = process.env;
    const url = `${REACT_APP_API_BASE_PATH}/api/warehouses`
    const formRef = useRef()
    const [warehouse, setWarehouse] = useState([])
      
    const handleClick = (e) => {
        e.preventDefault()
        addWarehouse(e)
    };

    const addWarehouse = async (e) => {
        e.preventDefault() 

        const newWarehouseData = {
            warehouse_name: formRef.current.warehouseName.value,
            address: formRef.current.address.value,
            city: formRef.current.city.value,
            country: formRef.current.country.value,
            contact_name: formRef.current.contactName.value,
            contact_position: formRef.current.contactPosition.value,
            contact_phone: formRef.current.contactPhone.value,
            contact_email: formRef.current.contactEmail.value,
            created_at: Date.now()
        }

        try {
            let newWarehouse = await axios.post(url, newWarehouseData)
            setWarehouse([...warehouse, newWarehouse])
            navigate('/Warehouse')
        } catch(error) {
            console.error(error)
        }
    }


    return (
        <main className="add-warehouse">
            <section className="add-warehouse__header">
                <h1 className="add-warehouse__title"><Link to={`/Warehouses`}><img src={back} alt="arrow-back"/></Link> Add New Warehouse</h1>
            </section>

            {/* FORM BEGINS HERE */}
            <form className="add-warehouse__form" action="">

                <div className="form__container">
                    {/* WAREHOUSE DETAILS */}
                    <div className="form__warehouse">
                        <h2 className="form__header">Warehouse Details</h2>
                        <div className="form__input">
                            <label htmlFor="">
                                <h3>Warehouse Name</h3>
                            </label>
                            <input placeholder="Warehouse Name" />
                        </div>
                        <div className="form__input">
                            <label htmlFor="">
                                <h3 className="form__label">Street Address</h3>
                            </label>
                            <input placeholder="Street Address" />
                        </div>
                        <div className="form__input">
                            <label htmlFor="">
                                <h3 className="form__label">City</h3>
                            </label>
                            <input placeholder="City" />
                        </div>
                        <div className="form__input">
                            <label htmlFor="">
                                <h3 className="form__label">Country</h3>
                            </label>
                            <input placeholder="Country" />
                        </div>
                    </div>
                    {/* CONTACT DETAILS */}
                    <div className="form__contact">
                        <h2 className="form__header">Contact Details</h2>
                        <div className="form__input">
                            <label htmlFor="">
                                <h3 className="form__label">Contact Name</h3>
                            </label>
                            <input placeholder="Contact Name" />
                        </div>
                        <div className="form__input">
                            <label htmlFor="">
                                <h3 className="form__label">Position</h3>
                            </label>
                            <input placeholder="Position" />
                        </div>
                        <div className="form__input">
                            <label htmlFor="">
                                <h3 className="form__label">Phone Number</h3>
                            </label>
                            <input placeholder="Phone Number" />
                        </div>
                        <div className="form__input">
                            <label htmlFor="">
                                <h3 className="form__label">Email</h3>
                            </label>
                            <input placeholder="Email" />
                        </div>
                    </div>
                </div>
                <div className="form__button-container">
                    <button className="form__cancel">Cancel</button>
                    <button className="form__add">+ Add Warehouse</button>
                </div>
            </form>
        </main>
    )
}

export default AddWarehouse;
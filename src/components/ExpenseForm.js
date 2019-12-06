import React from 'react';
import { MdSend } from 'react-icons/md';

const ExpenseForm = ({charge, amount, handleCharge, handleAmount, handleSubmit, edit}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label>Charge</label>
                    <input type="text" className="form-control" value={charge} onChange={(e) => handleCharge(e)} id="charge" name="charge"/>
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input type="number" className="form-control" value={amount} onChange={(e) => handleAmount(e)} id="amount" name="amount" />
                </div>
            </div>
            <button type="submit" className="btn">{edit? "Edit" : "Submit"}<MdSend className="btn-icon"/></button>
        </form>
    )
}

export default ExpenseForm;

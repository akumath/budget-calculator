import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
import uuid from 'uuid/v4'

const initialState = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];

const App = () => {

  // ************** state value ************ //
  const [ expenses, setExpenses ] = useState(initialState);

  const [ charge, setCharge ] = useState('');
    
  const [ amount, setAmount ] = useState('');

  // alert
  const [ alert, setAlert ] = useState({show:false})

  const [ edit, setEdit ] = useState(false);

  const [ id, setId ] = useState('')

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  },[expenses])

  // ************** Functionality ************ //

  // handle alert
  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text});
    setTimeout(() => {
      setAlert({show: false})
    }, 3000)
  }

  const handleAmount = (e) => {
    setAmount(e.target.value);
  }

  const handleCharge = (e) => {
    setCharge(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {

      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        });
        setExpenses(tempExpenses);
        setEdit(false);
      } else {
        const singleExpense = {
          id: uuid(),
          charge: charge,
          amount: amount
        }
        setExpenses([...expenses, singleExpense])
        //handleAlert({ type: "success", text: "item added"})
      }
      setCharge('');
      setAmount('');
    }
  }

  // clear all items
  const clearItems = () => {
    setExpenses([]);
  }

  // Delete single item
  const handleDelete = (id) => {
    let tempExpense = expenses.filter(item => item.id !== id);
    setExpenses(tempExpense)
  }

  // Edit single item
  const handleEdit = (id) => {
    setEdit(true);
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);   
    setAmount(amount);
    setId(id);
  }

  return(
    <React.Fragment>
      {alert.show && <Alert type={alert.type} text={alert} /> }
      <h1>Budget Calculator</h1>
      <main className="App">
      <ExpenseForm charge={charge} amount={amount} handleCharge={handleCharge} handleAmount={handleAmount} handleSubmit={handleSubmit} edit={edit}/>
      <ExpenseList expenses={expenses} clearItems={clearItems} handleEdit={handleEdit} handleDelete={handleDelete}/>
      </main>
      <h1>Total Spending: <span className="total">
        { expenses.reduce((acc, curr) =>{
          return (acc = acc + parseInt(curr.amount))
        }, 0)}
        </span>
      </h1>
    </React.Fragment>
  )
}

export default App;

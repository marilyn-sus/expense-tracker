const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const incomeForm = document.getElementById('income-form');
const expenseForm = document.getElementById('expense-form');
const incomeText = document.getElementById('income-text');
const incomeAmount = document.getElementById('income-amount');
const expenseText = document.getElementById('expense-text');
const expenseAmount = document.getElementById('expense-amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addIncome(e) {
  e.preventDefault();

  if (incomeText.value.trim() === '' || incomeAmount.value.trim() === '') {
    alert('Please fill in all fields');
    return;
  }

  const transaction = {
    id: Math.floor(Math.random() * 100000000),
    text: incomeText.value,
    amount: +incomeAmount.value
  };

  transactions.push(transaction);
  updateLocalStorage();
  init();

  incomeText.value = '';
  incomeAmount.value = '';
}

function addExpense(e) {
  e.preventDefault();

  if (expenseText.value.trim() === '' || expenseAmount.value.trim() === '') {
    alert('Please fill in all fields');
    return;
  }

  const transaction = {
    id: Math.floor(Math.random() * 100000000),
    text: expenseText.value,
    amount: -Math.abs(+expenseAmount.value)
  };

  transactions.push(transaction);
  updateLocalStorage();
  init();

  expenseText.value = '';
  expenseAmount.value = '';
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text}
    <span>${sign}₵${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(t => t.amount);

  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts.filter(v => v > 0).reduce((acc, v) => acc + v, 0).toFixed(2);
  const expense = (amounts.filter(v => v < 0).reduce((acc, v) => acc + v, 0) * -1).toFixed(2);

  balance.innerText = `₵${total}`;
  moneyPlus.innerText = `+₵${income}`;
  moneyMinus.innerText = `-₵${expense}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

incomeForm.addEventListener('submit', addIncome);
expenseForm.addEventListener('submit', addExpense);
init();

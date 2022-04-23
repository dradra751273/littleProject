import { empsDataFromArrToObj, addEmployeeToWorkGroup, showEmployeeModal } from './99_utilites.js'
import { renderNavbar, renderEmployees, } from './99_renderFuncs.js'
import { searchEmployees, } from './99_listenerFuncs.js'

// DOM nodes
const employeeCards = document.querySelector('#employee-cards')
const mainNavbar = document.querySelector('#main-navbar')
const dataPanel = document.querySelector("#data-panel");
// Data
const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/api/v1/users'
let searchedEmps = JSON.parse(localStorage.getItem('searchedEmps'))


// DOM add listener
employeeCards.addEventListener('click', function(event) {
  if (event.target.id === 'work-group1') {
    const employeeId = Number(event.target.dataset.id)
    console.log(employeeId)
    addEmployeeToWorkGroup('workGroup1_Emps', employeeId, employeesData)
  }
  if (event.target.id === 'work-group2') {
    const employeeId = Number(event.target.dataset.id)
    addEmployeeToWorkGroup('workGroup1_Emps', employeeId, employeesData)
  }
})

dataPanel.addEventListener("click", function (event) {
  if (event.target.matches(".card-img-top")) {
    showEmployeeModal(event.target.dataset.id);
  }
});

// main excution block
let employeesData = {}
axios
  .get(BASE_URL)
  .then(function(response) {
    // catch all employees
    employeesData = empsDataFromArrToObj([...response.data.results])
    // render page
    renderNavbar()
    renderEmployees(searchedEmps, employeeCards)
    // DOM add linstener
    const clickedOnSearch = searchEmployees(employeesData)
    mainNavbar.addEventListener('click', clickedOnSearch)
  })
  .catch((err) => {
    console.log(err)
  })

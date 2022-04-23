import {
  empsDataFromArrToObj,
  directorId,
  addEmployeeToWorkGroup,
  employeesInDepartment,
  getEmployeesByPage,
  showEmployeeModal
} from './99_utilites.js'

import {
  renderNavbar,
  renderDirector,
  renderEmployees,
  renderPagination,
} from './99_renderFuncs.js'

import { searchEmployees, } from './99_listenerFuncs.js'


// const Data
const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/api/v1/users'
// DOM nodes
const directorCard = document.querySelector('#director-card')
const employeeCards = document.querySelector('#employee-cards')
const mainNavbar = document.querySelector('#main-navbar')
const paginator = document.querySelector('#paginator')
const dataPanel = document.querySelector("#data-panel");
// general Data
const departmentName = mainNavbar.dataset.departmentName
const companyPhilosophy = ' This is a wider card with supporting.'

// DOM add listener
employeeCards.addEventListener('click', function(event) {
  if (event.target.id === 'work-group1') {
    const employeeId = Number(event.target.dataset.id)
    addEmployeeToWorkGroup('workGroup1_Emps', employeeId, employeesData)
  }
  if (event.target.id === 'work-group2') {
    const employeeId = Number(event.target.dataset.id)
    addEmployeeToWorkGroup('workGroup2_Emps', employeeId, employeesData)
  }
})

paginator.addEventListener('click', function clickedOnPaginator(event) {
  if (event.target.tagName !== 'A') return
  let pageNo = Number(event.target.dataset.page)
  renderEmployees(getEmployeesByPage(departmentEmployees, pageNo), employeeCards)
})

dataPanel.addEventListener("click", function(event) {
  if (event.target.matches(".modal-img") || event.target.matches(".modal-btn")) {
    showEmployeeModal(event.target.dataset.id)
  }
});

// main excution block
let employeesData = {}
let departmentEmployees = []
axios
  .get(BASE_URL)
  .then(function(response) {
    // renderNavbar
    renderNavbar()
    // catch all employees
    employeesData = empsDataFromArrToObj([...response.data.results])
    // render page
    renderDirector(employeesData, directorId(departmentName), directorCard, companyPhilosophy)
    departmentEmployees = employeesInDepartment(employeesData, departmentName)  // catch deaparment employees
    renderEmployees(getEmployeesByPage(departmentEmployees, 1), employeeCards)
    renderPagination(departmentEmployees.length, paginator)
    // DOM add linstener
    const clickedOnSearch = searchEmployees(employeesData)
    mainNavbar.addEventListener('click', clickedOnSearch)
  })
  .catch((err) => {
    console.log(err)
  })

import { empsDataFromArrToObj, showEmployeeModal} from './99_utilites.js'
import { renderNavbar, renderWorkingGroupEmps, } from './99_renderFuncs.js'
import { searchEmployees, } from './99_listenerFuncs.js'

// Data
const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/api/v1/users'
const mainNavbar = document.querySelector('#main-navbar')
const employeeCards = document.querySelector('#employee-cards')
const dataPanel = document.querySelector("#data-panel");
const WorkGroupName = mainNavbar.dataset.groupName
let employeesInWorkGroup = JSON.parse(localStorage.getItem(WorkGroupName))

// add listeners
employeeCards.addEventListener('click', function clickedOnLeaveBtn(event) {
  if (event.target.id === 'leaveWG') {
    const employeeId = event.target.dataset.id
    delete employeesInWorkGroup[employeeId]
    // 
    localStorage.setItem(WorkGroupName, JSON.stringify(employeesInWorkGroup))
    renderWorkingGroupEmps(Object.values(employeesInWorkGroup), employeeCards)
  }
})

dataPanel.addEventListener("click", function (event) {
  if (event.target.matches(".modal-img")) {
    showEmployeeModal(event.target.dataset.id);
  }
});

// main excution block
let employeesData = {}
axios
  .get(BASE_URL)
  .then(function(response) {
    employeesData = empsDataFromArrToObj([...response.data.results])
    // render page
    renderNavbar()
    renderWorkingGroupEmps(Object.values(employeesInWorkGroup), employeeCards)
    // DOM add linstener
    const clickedOnSearch = searchEmployees(employeesData)
    mainNavbar.addEventListener('click', clickedOnSearch)
    
  })
  .catch((err) => {
    console.log(err)
  })

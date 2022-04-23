import { empsDataFromArrToObj, } from './99_utilites.js'
import { searchEmployees, } from './99_listenerFuncs.js'

const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/api/v1/users'
const mainNavbar = document.querySelector('#main-navbar')
const chairmanInfoCard = document.querySelector('#chairman-container')
const directorInfoCards = document.querySelector('#direcor-container')
const chairman_ID = 601
const directorsUnits = {
  602: '原料供應科',
  603: '企業發展科',
  604: '營運支援科',
  605: '營運事業科',
}

const compayPhilosophy =
  ' This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'

// render function
function renderHomePage(data) {
  let chairmanData = []
  let directorsData = []
  data.forEach(function findChairman(employee) {
    if (employee.id === chairman_ID) {
      chairmanData.push(employee)
    }
    if (Object.keys(directorsUnits).includes(String(employee.id))) {
      employee.unit = directorsUnits[String(employee.id)]

      directorsData.push(employee)
    }
  })

  chairmanInfoCard.innerHTML = `
    <div class="card mb-2 text-white bg-dark rounded border-3 border-primary">
      <div class="row g-0">
        <div class="col-md-4 chairman-img">
          <img src=${chairmanData[0].avatar} class="img-fluid h-100 w-100 rounded" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Chairman - ${chairmanData[0].name}</h5>
              <p class="card-text">${compayPhilosophy}</p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  `
  directorsData.forEach((data) => {
    directorInfoCards.innerHTML += `
      <div div class="card mb-3 text-white bg-dark rounded">
        <div class="row g-0">
          <div class="col-sm-2 director-img">
            <img src=${data.avatar} class="img-fluid h-100 rounded" alt="..." />
          </div>
          <div class="col-sm-10 ">
            <div class="card-body">
              <h5 class="card-title">${data.unit}</h5>
              <p class="card-text"><strong>主要職掌 - </strong><br />科長 - ${data.name}</p>
            </div>
          </div>
        </div>
      </div>
    `
  })
}


// main excution block
let employeesData = {}
axios
  .get(BASE_URL)
  .then(function(response) {
    employeesData = empsDataFromArrToObj([...response.data.results])
    renderHomePage(Object.values(employeesData))
    // DOM add linstener
    const clickedOnSearch = searchEmployees(employeesData)
    mainNavbar.addEventListener('click', clickedOnSearch)
  })
  .catch((err) => {
    console.log(err)
  })

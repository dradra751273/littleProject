// 
const EMPS_PER_PAGE = 10
const mainNavbar = document.querySelector('#main-navbar')
// render functions
export function renderNavbar() {
  mainNavbar.innerHTML = `
  <div class="container-fluid">
    <a class="navbar-brand" href="index.html">關於公司</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="1_MaterialSupply.html">原料供應科</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="1_EnterpriseDev.html">企業發展科</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="1_OperationSupport.html">營運支援科</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href=1_OperationBusiness.html>營運事業科</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Work Groups
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="6_WorkGroup1.html">Work Group 1</a></li>
            <li><a class="dropdown-item" href="6_WorkGroup2.html">Work Group 2</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex" id="search-form">
        <input
          class="form-control me-2"
          type="search"
          placeholder="name to search"
          aria-label="Search"
        />
        <a class="btn btn-outline-success" id="search-link" href="#">
          Search
        </a>
      </form>
    </div>
  </div>
  `
}

export function renderDirector(employeesData, director_ID, directorCardNode, companyPhilosophy) {
  directorCardNode.innerHTML = `
    <div class="card mb-2 text-white bg-dark rounded border-3 border-primary">
      <div class="row g-0">
        <div class="col-lg-4 chairman-img">
          <img src=${employeesData[String(director_ID)].avatar} class="img-fluid h-100 w-100 rounded modal-img" alt="..." />
        </div>
        <div class="col-lg-8">
          <div class="card-body">
            <h5 class="card-title">Chairman - ${employeesData[String(director_ID)].name}</h5>
            <p class="card-text">${companyPhilosophy}</p>
          </div>
        </div>
      </div>
    </div>
  `
}

export function renderEmployees(employeesData, employeeCardsNode) {
  let rawHTML = ''
  employeesData.forEach((emp) => {
    rawHTML += `
      <div class="col">
      <div class="card text-white bg-dark" style="width: 9rem">
        <img src=${emp.avatar} class="card-img-top modal-img" alt="img" data-bs-toggle="modal" data-bs-target="#employee-modal" data-id=${emp.id} />
        <div class="card-body">
          <h6 class="card-title"><strong>${emp.name}</strong></h6>
          <div class="d-grid gap-2">
            <button class="btn btn-primary btn-sm modal-btn" type="button" data-bs-toggle="modal" data-bs-target="#employee-modal" data-id=${emp.id}><strong>More</strong></button>
            <div class="dropdown" styles="width: 10rem">
              <button class="btn btn-outline-warning btn-sm dropdown-toggle" id="seletWorkGroup" data-bs-toggle="dropdown"><strong>Work Group</strong></button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><button class="dropdown-item" id="work-group1" type="button" data-id=${emp.id}>Work Group 1</button></li>
                <li><button class="dropdown-item" id="work-group2" type="button" data-id=${emp.id}>Work Group 2</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  })
  employeeCardsNode.innerHTML = rawHTML
}

export function renderWorkingGroupEmps(employeesData, employeeCards) {
  let rawHTML = ''
  employeesData.forEach((emp) => {
    rawHTML += `
        <div class="col">
          <div class="card text-white bg-dark" style="width: 9rem">
            <img src=${emp.avatar} class="card-img-top modal-img" alt="img" data-bs-toggle="modal" data-bs-target="#employee-modal" data-id=${emp.id} />
            <div class="card-body">
              <h6 class="card-title"><strong>${emp.name}</strong></h6>
              <div class="d-grid gap-2">
                <button class="btn btn-outline-danger btn-sm"  type="button" id="leaveWG" data-id=${emp.id}>leave WG</button>
              </div>
            </div>
          </div>
        </div>
      `
  })
  employeeCards.innerHTML = rawHTML
}


export function renderPagination(amount, paginatorNode) {
  const numberOfPages = Math.ceil(amount / EMPS_PER_PAGE)
  let rawHTML = ''
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `
      <li class="page-item"><a class="page-link" data-page=${page} href="#">${page}</a></li>
    `
  }
  paginatorNode.innerHTML = rawHTML
}
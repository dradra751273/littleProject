const BASE_URL = "https://lighthouse-user-api.herokuapp.com/api/v1/users";
const INDEX_URL = BASE_URL + "/";
const CHAIRMAN_ID = 601
const DIRECTORS_ID_LIST = [602, 603, 604, 605]
const MATERIAL_SUPPLY_EMP_NO = 50
const ENTERPRISE_DEVELOPE_EMP_NO = 50
const OPERATION_SUPPORT_EMP_NO = 50
const OPERATION_BUSINESS_EMP_NO = 49
const EMPS_PER_PAGE = 10

// General functions
export function empsDataFromArrToObj(originalData) {
  let result = {}
  originalData.forEach(function(emp) {
    result[emp.id] = emp
  })
  return result
}

export function directorId(departmentName) {
  if (departmentName === 'MS') return 602
  if (departmentName === 'ED') return 603
  if (departmentName === 'OS') return 604
  if (departmentName === 'OB') return 605

}

export function employeesInDepartment(employeesData, department) {
  let startIndex = 0
  let endIndex = 0
  if (department === 'MS') {
    startIndex = 0
    endIndex = MATERIAL_SUPPLY_EMP_NO
  }
  if (department === 'ED') {
    startIndex = MATERIAL_SUPPLY_EMP_NO
    endIndex = MATERIAL_SUPPLY_EMP_NO + ENTERPRISE_DEVELOPE_EMP_NO
  }

  if (department === 'OS') {
    startIndex = MATERIAL_SUPPLY_EMP_NO + ENTERPRISE_DEVELOPE_EMP_NO
    endIndex =
      MATERIAL_SUPPLY_EMP_NO +
      ENTERPRISE_DEVELOPE_EMP_NO +
      OPERATION_SUPPORT_EMP_NO
  }

  if (department === 'OB') {
    startIndex =
      MATERIAL_SUPPLY_EMP_NO +
      ENTERPRISE_DEVELOPE_EMP_NO +
      OPERATION_SUPPORT_EMP_NO
    endIndex =
      MATERIAL_SUPPLY_EMP_NO +
      ENTERPRISE_DEVELOPE_EMP_NO +
      OPERATION_SUPPORT_EMP_NO +
      OPERATION_BUSINESS_EMP_NO -
      1
  }
  let result = []
  Object.values(employeesData).forEach((emp) => {
    if (emp['id'] !== CHAIRMAN_ID && !DIRECTORS_ID_LIST.includes(emp['id'])) {
      result.push(emp)
    }
  })
  return result.slice(startIndex, endIndex)
}

export function getEmployeesByPage(employeesData, page) {
  const startIndex = (page - 1) * EMPS_PER_PAGE
  return employeesData.slice(startIndex, startIndex + EMPS_PER_PAGE)
}

export function addEmployeeToWorkGroup(WorkGroupName, employeeId, employeesData) {
  // employees in work group [localStorage]
  let employeesInWrokGroup = {}
  if (JSON.parse(localStorage.getItem(WorkGroupName))) {
    employeesInWrokGroup = JSON.parse(localStorage.getItem(WorkGroupName))
  }
  // check if the employee is already in the work group
  if (Object.keys(employeesInWrokGroup).includes(String(employeeId))) {
    alert('已在群組')
    return
  }
  employeesInWrokGroup[employeeId] = employeesData[String(employeeId)]
  localStorage.setItem(WorkGroupName, JSON.stringify(employeesInWrokGroup))
}



// Modal function
export function showEmployeeModal(id) {
  const modalTitle = document.querySelector('.modal-title')
  const modalImage = document.querySelector('.modal-image')
  const modalEmail = document.querySelector('#email')
  const modalGender = document.querySelector('#gender')
  const modalAge = document.querySelector('#age')
  const modalRegion = document.querySelector('#region')
  const modalBirthday = document.querySelector('#birthday')
  console.log(INDEX_URL + id)
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data
    modalTitle.innerText = `${data.name} ${data.surname}`
    modalEmail.innerText = 'Email: ' + data.email
    modalGender.innerText = 'Gender: ' + data.gender
    modalAge.innerText = 'Age: ' + data.age
    modalRegion.innerText = 'Region: ' + data.region
    modalBirthday.innerText = 'Birthday: ' + data.birthday
    modalImage.innerHTML = `<img src=${data.avatar} class="modal-image-inner" alt="user-image" />`
  })
}
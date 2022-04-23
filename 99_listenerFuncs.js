// listener function
export function searchEmployees(employeesData) {
  function foundEmployees(employeesData, searchValue) {
    let result = []
    Object.values(employeesData).forEach((employee) => {
      let employeeName = employee['name'].trim().toLowerCase()
      let employeeSurname = employee['surname'].trim().toLowerCase()
      if (employeeName.includes(searchValue) || employeeSurname.includes(searchValue)) {
        result.push(employee)
      }
    })
    return result
  }
  // return function
  return function(event) {
    if (event.target.id !== 'search-link') return
    const searchLink = event.target
    const searchValue = searchLink.previousElementSibling.value
      .trim()
      .toLowerCase()
    foundEmployees(employeesData, searchValue)
    
    localStorage.setItem('searchedEmps', JSON.stringify(foundEmployees(employeesData, searchValue)))
    searchLink.href = '2_Search.html'
  }
}
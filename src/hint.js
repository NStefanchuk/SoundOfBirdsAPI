export const showHint = (searchInput, hintBox, list) => {
  const searchInputElement = document.getElementById(searchInput)
  const hintBoxElement = document.getElementById(hintBox)

  let matches = []

  searchInputElement.addEventListener('input', (e) => {
    filterSearchParam(e.target.value)
  })

  const filterSearchParam = (query = '') => {
    hintBoxElement.innerHTML = ''

    if (!query) {
      matches = list.sort(() => Math.random() - 0.5).slice(0, 10)
    } else {
      matches = list
        .filter((searchParam) =>
          searchParam.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 10)
    }

    matches.forEach((param) => {
      const searchParam = document.createElement('div')
      const searchParamText = document.createElement('span')
      searchParam.className = 'suggestion-item'
      searchParamText.textContent = param
      searchParam.appendChild(searchParamText)
      searchParam.onclick = () => {
        searchInputElement.value = param
        hintBoxElement.style.display = 'none'
      }
      hintBoxElement.appendChild(searchParam)
    })

    hintBoxElement.style.display = matches.length ? 'block' : 'none'
  }

  searchInputElement.addEventListener('focus', () => {
    filterSearchParam()
  })

  document.addEventListener('click', (e) => {
    if (!hintBoxElement.contains(e.target) && e.target !== searchInputElement) {
      hintBoxElement.style.display = 'none'
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
 console.log("gotcha")
        // show all dogs //
 const table = document.getElementById("table-body")
  const newDog = (dog) => {
   table.innerHTML +=
   `<tr id=${dog.id}>
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td class="editBtn"><button id=${dog.id}>Edit</button></td>
    </tr>`
  }

  const showDog = fetch(`http://localhost:3000/dogs`)
  .then(res=>res.json())
  .then(dogs => {
    console.log("dogs loaded")
    dogs.forEach(dog => newDog(dog))
  })
    // end show all dogs //

    // edit button //

  const editBtn = document.getElementsByClassName("editBtn")
  console.log('edit', editBtn)

  table.addEventListener("click", function(e){
    const btnId = e.target.id
    const dogId = e.target.parentElement.parentElement.id
    const gender = e.target.parentElement.previousElementSibling.innerText
    const breed = e.target.parentElement.previousElementSibling.previousElementSibling.innerText
    const name = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText
  
    if (e.target.parentElement.className === "editBtn"){
      if (btnId === dogId){
        console.log("booyah")
        const form = document.getElementById("dog-form")
        form.firstElementChild.value = name
        form.firstElementChild.nextElementSibling.value = breed
        form.lastElementChild.previousElementSibling.value = gender

        form.addEventListener("submit", function(e){
          e.preventDefault()
          fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({name: form.firstElementChild.value, breed: form.firstElementChild.nextElementSibling.value, sex: form.lastElementChild.previousElementSibling.value})
          }).then(res => res.json())
            .then(res => {
            let row = document.getElementById(dogId)
            row.firstElementChild.innerHTML = res.name
            row.firstElementChild.nextElementSibling.innerHTML  = res.breed
            row.lastElementChild.previousElementSibling.innerHTML = res.sex
            })
        })
      }
    }
  })

})

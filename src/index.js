document.addEventListener('DOMContentLoaded', () => {
  const DOGS_URL = "http://localhost:3000/dogs";
  const tableBody = document.getElementById("table-body");
  const dogForm = document.getElementById("dog-form");
  const nameInput = document.getElementById("name-input");
  const breedInput = document.getElementById("breed-input");
  const sexInput = document.getElementById("sex-input");
  const idInput = document.getElementById("id-input");

  const createDogRow = function(dog) {
    tableBody.innerHTML += `
      <tr id=dogTr${dog.id}>
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button data-dog-id=${dog.id} id=edit-dog${dog.id}-btn>Edit</button></td>
      </tr>
    `
  }

  function fetchDogs(url) {
    tableBody.innerHTML = ""
    fetch(url)
      .then(res => res.json())
      .then(dogs => {
        dogs.forEach(function(dog) {
          createDogRow(dog);
        })
      })
      .catch(error => {
        alert(error.message);
        console.log(error.message);
      })
  }

  fetchDogs(DOGS_URL);

  const submitEdit = function(dogName, dogBreed, dogSex, dogId) {
    let formData = {
      name: dogName,
      breed: dogBreed,
      sex: dogSex
    }

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }
    // not sure how to get dog.id --> not functional yet
    fetch(DOGS_URL + `/${dogId}`, configObj)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        fetchDogs(DOGS_URL);
      })
      .catch(error => {
        alert(error.message);
        console.log(error.message);
      })
  }

  dogForm.addEventListener('submit', function(e) {
    e.preventDefault();
    submitEdit(nameInput.value, breedInput.value, sexInput.value, idInput.value);
  });

  tableBody.addEventListener('click', function(e) {
    if (e.target.hasAttribute("data-dog-id")) {
      const dogId = e.target.dataset.dogId;
      const dogRow = document.getElementById(`dogTr${dogId}`).querySelectorAll('td');
      nameInput.value = dogRow[0].textContent;
      breedInput.value = dogRow[1].textContent;
      sexInput.value = dogRow[2].textContent;
      idInput.value = dogId.toString();
      console.log(dogId)
    }
  });
})

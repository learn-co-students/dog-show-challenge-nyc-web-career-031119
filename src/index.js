const BASE_URL = `http://localhost:3000`;
const DOG_URL = `${BASE_URL}/dogs`;
// const DOG = `${BASE_URL}/dogs/:id`;

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('dog-form');
	const table = document.getElementById('table-body');
	const nameInput = form.children[0];
	const breedInput = form.children[1];
	const sexInput = form.children[2];

	const renderDog = function (dog) {
		const tr = document.createElement('tr');
		tr.id = `dog-${dog.id}`;
		tr.innerHTML +=
			`<td>${dog.name}</td> 
			<td>${dog.breed}</td> 
			<td>${dog.sex}</td> 
			<td>
				<button class="edit-dog" id=${dog.id}>Edit</button>
			</td>`;
		return tr
	};

	fetch(DOG_URL)
		.then(res => res.json())
		.then( dogs => {
			dogs.forEach(dog => {
				table.append(renderDog(dog))
			})
		});

	document.addEventListener('click', e => {
		if (e.target.className === 'edit-dog') {
			const parent = e.target.parentElement.parentElement.children;
			const dogName = parent[0];
			const dogBreed = parent[1];
			const dogSex = parent[2];
			const dogId = parseInt(e.target.id);

			nameInput.value = dogName.innerHTML;
			breedInput.value = dogBreed.innerHTML;
			sexInput.value = dogSex.innerHTML;
// debugger;
			form.addEventListener('submit', e => {
				e.preventDefault();
				fetch(`${DOG_URL}/${dogId}`, {
					method: `PATCH`,
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name: nameInput.value,
						breed: breedInput.value,
						sex: sexInput.value
					})
				})
					.then(res => res.json())
					.then(dog => {
						dogName.innerHTML = dog.name;
						dogBreed.innerHTML = dog.breed;
						dogSex.innerHTML = dog.sex;
				});
			});
		}
	})
});

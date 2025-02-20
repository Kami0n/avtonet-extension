
const queryString = window.location.href;

const sidebarVsi = document.querySelectorAll('.GO-ResultsMenuBox div div');
for (const element of sidebarVsi) {
	
	const text = element.textContent;
	if(text.includes('Cena')){
		createFieldsForFilter(element.nextElementSibling, 'cena', 1000);
	}
	if(text.includes('Moč motorja (kW)')){
		createFieldsForFilter(element.nextElementSibling, 'kw', 10);
	}
	if(text.includes('Prevoženi km')){
		createFieldsForFilter(element.nextElementSibling, 'subKM', 1000);
	}
	if(text.includes('Motor (ccm)')){
		createFieldsForFilter(element.nextElementSibling, 'ccm');
	}
	if(text.includes('Letnik 1.registracije')){
		createFieldsForFilter(element.nextElementSibling, 'letnik');
	}
	
}

function createFieldsForFilter(parentElement, id, step = 1, max = 0){
	
	// Create "From" input field
	const fromLabel = document.createElement('label');
	fromLabel.textContent = 'Od: ';
	
	const fromInput = document.createElement('input');
	fromInput.type = 'number';
	fromInput.min = 0;
	fromInput.step = step;
	fromInput.placeholder = 'min';
	fromInput.id = `${id}-from`;
	fromInput.value = getUrlParameter(`${id}Min`);
	
	// Create "To" input field
	const toLabel = document.createElement('label');
	toLabel.textContent = 'Do: ';
	
	const toInput = document.createElement('input');
	toInput.type = 'number';
	toInput.min = 0;
	if(max != 0){
		toInput.max = max;
	}
	toInput.step = step;
	toInput.placeholder = 'max';
	toInput.id = `${id}-to`;
	toInput.value = getUrlParameter(`${id}Max`);
	
	parentElement.innerHTML = "";
	const filterWrapper = document.createElement('div');
	filterWrapper.classList = 'filter-wrapper';
	
	
	const inputWrapper = document.createElement('div');
	inputWrapper.classList = 'input-wrapper';
	
	// Append elements to the container
	inputWrapper.appendChild(fromLabel);
	inputWrapper.appendChild(fromInput);
	
	filterWrapper.appendChild(inputWrapper);
	
	const inputWrapper2 = document.createElement('div');
	inputWrapper2.classList = 'input-wrapper';
	
	inputWrapper2.appendChild(toLabel);
	inputWrapper2.appendChild(toInput);
	
	filterWrapper.appendChild(inputWrapper2);
	
	const button = document.createElement('button');
	button.textContent = "Potrdi"
	button.classList = 'btn btn-block GO-Button-Orange newFilterAction';
	button.dataset.idinputs = id;
	
	filterWrapper.appendChild(button);
	
	parentElement.appendChild(filterWrapper);
	
}

document.addEventListener("click", function(e){
	const target = e.target.closest(".newFilterAction");
	if(target){
		
		const id = target.dataset.idinputs;
		
		let newQueryString = queryString;
		
		const fromValue = document.querySelector(`input#${id}-from`).value;
		newQueryString = replaceUrlParameter(newQueryString, `${id}Min`, fromValue);
		
		const toValue = document.querySelector(`input#${id}-to`).value;
		newQueryString = replaceUrlParameter(newQueryString, `${id}Max`, toValue);
		
		window.location.href = newQueryString
	}
});

function getUrlParameter(paramName) {
	// Get the query string from the current URL
	const queryString = window.location.search;
	
	// Create a URLSearchParams object
	const urlParams = new URLSearchParams(queryString);
	
	// Use the get method to retrieve the value of the specified parameter
	return urlParams.get(paramName);
}

function replaceUrlParameter(url, param, newValue) {
	
	// Create a URL object from the provided URL string
	let urlObj = new URL(url);
	
	// Use URLSearchParams to manipulate the query parameters
	let params = new URLSearchParams(urlObj.search);
	
	// Set the new value for the specified parameter
	params.set(param, newValue);
	
	// Update the URL object with the modified search parameters
	urlObj.search = params.toString();
	
	// Return the updated URL as a string
	return urlObj.toString();
}
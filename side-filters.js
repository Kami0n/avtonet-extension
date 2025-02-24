
const queryString = window.location.href;

const sidebarVsi = document.querySelectorAll('.GO-ResultsMenuBox div div');
for (const element of sidebarVsi) {
	
	const text = (element.textContent+"").trim()+"";
	
	
	
	if(text === 'Cena'){
		createFieldsForFilter(element.nextElementSibling, 'cena', 1000);
	}
	if(text === 'Cena (končna MPC)'){
		createFieldsForFilter(element.nextElementSibling, 'subcena', 1, 1000, true);
	}
	
	if(text === 'Moč motorja (kW)'){
		createFieldsForFilter(element.nextElementSibling, 'kw', 10);
	}
	if(text === 'Prevoženi km'){
		createFieldsForFilter(element.nextElementSibling, 'subKM', 1000);
	}
	if(text === 'Motor (ccm)'){
		createFieldsForFilter(element.nextElementSibling, 'ccm');
	}
	if(text === 'Letnik 1.registracije'){
		createFieldsForFilter(element.nextElementSibling, 'letnik');
	}
	if(text === 'Max.skupna teža' ){
		createFieldsForFilter(element.nextElementSibling, 'subMOC', 250, 40000, true );
	}
	if(text === 'Nosilnost' ){
		createFieldsForFilter(element.nextElementSibling, 'subKG', 250, 40000, true );
	}
	
}

function createFieldsForFilter(parentElement, id, step = 1, max = 0, upper = false){
	
	// Create "From" input field
	const fromLabel = document.createElement('label');
	fromLabel.textContent = 'Od: ';
	
	const classes = 'filterNumber';
	
	const fromInput = document.createElement('input');
	fromInput.type = 'number';
	fromInput.classList = classes;
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
	toInput.classList = classes;
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
	button.dataset.upper = upper;
	
	filterWrapper.appendChild(button);
	
	parentElement.appendChild(filterWrapper);
	
}

document.addEventListener("keyup", function(e){
	if (e.key === 'Enter' || e.keyCode === 13) {
		if(e.target.closest("input.filterNumber")){
			const button = e.target.parentNode.parentNode.querySelector(".newFilterAction");
			button.click();
		}
	}
});

document.addEventListener("click", function(e){
	const target = e.target.closest(".newFilterAction");
	if(target){
		
		const id = target.dataset.idinputs;
		
		let newQueryString = queryString;
		
		let min = 'Min';
		let max = 'Max';
		
		if(target.dataset.upper){
			min = min.toUpperCase();
			max = max.toUpperCase();
		}
		
		const fromValue = document.querySelector(`input#${id}-from`).value;
		newQueryString = replaceUrlParameter(newQueryString, `${id}${min}`, fromValue);
		
		const toValue = document.querySelector(`input#${id}-to`).value;
		newQueryString = replaceUrlParameter(newQueryString, `${id}${max}`, toValue);
		
		console.log(fromValue);
		console.log(toValue);
		console.log(newQueryString);
		
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
	
	if(!newValue || newValue == ''){
		return url;
	}
	
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
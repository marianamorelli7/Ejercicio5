function getCategory(siteID) {
    const categories = document.getElementById('category_id');
    categories.innerText = "";
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.mercadolibre.com/sites/' + siteID + '/categories', true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            data.forEach(category => {
                var option = document.createElement('option');
                option.setAttribute('value', category.id);
                option.textContent = category.name;
                categories.appendChild(option);
            });
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = "Dont work!";
            app1.appendChild(errorMessage);
        }
    };
    request.send();
}

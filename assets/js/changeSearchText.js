var searchBar = document.getElementById("searchBar");
var selectBar = document.getElementById("selectBar");

function changeSearchText(){
    
    var selected = selectBar.options[selectBar.selectedIndex].value;

    if(selected == "random"){
        searchBar.disabled = true;
        searchBar.placeholder = "Se buscará una receta aleatoria";
    } else if(selected == "search"){
        searchBar.disabled = false;
        searchBar.placeholder = "¿Qué receta desea buscar?";
    } else{
        searchBar.disabled = false;
        searchBar.placeholder = "¿Qué ingredientes quieres usar? (separar con comas)";
    }
}


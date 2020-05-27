var searchBar = document.getElementById("searchBar");
var selectBar = document.getElementById("selectBar");

var recipeTitle = document.getElementById("recipeTitle");
var recipeIngredients = document.getElementById("recipeIngredients");
var recipeteText = document.getElementById("recipeText");
var recipeImage = document.getElementById("recipeImage");
var recipeSection = document.getElementById("recipeSection");

const api = "https://api.spoonacular.com/recipes/";
const number = "number=1";
const key = "&apiKey=21ed6d25d2b74c229065f3d7dcec3980"

async function searchRecipe(){

    var option = selectBar.options[selectBar.selectedIndex].value;
    var json;

    if(option == "random"){
        json = await getRandomRecipe(option);
    } else if(option == "search"){
        json = await getRecipe(option);
    } else{
        json = await getIngredientsRecipe(option);
    }

    var data = getData(json);

    showRecipe(data[0], data[1], data[2], data[3]);
}

//Obtiene datos de la receta aleatoria y los muestra
async function getRandomRecipe(option){

    //Creo la url para obtener una receta aleatoria
    var url = api + option + "?" + number + key;
    
    //Obtengo el json de la consulta
    var json = await getJSON(url);

    return json.recipes[0];
}

//Crea utl y obtiene json de receta
async function getRecipe(option){

    //Obtengo el input del usuario en el campo de texto
    var selected = getSearchBarContent();
 
    //Creo la url para obtener la direccion de la receta
    var url = api + option + "?query=" + selected + "&" + number + "00" + key;

    //Obtengo el json de la consulta
    var query = await getJSON(url);

    //Selecciono una receta aleatoria de las obtenidas
    var index = Math.floor(Math.random() * (99 - 0) + 0); 

    //Obtengo la direccion de la receta
    var source = query.results[index].sourceUrl;

    //Obtengo dirección de la receta
    var recipeUrl = api + "extract?url=" + source + "&" + key; 

    //obtengo la receta
    var json = await getJSON(recipeUrl);

    return json;
}

//Obtiene json de receta basada en ingredientes
async function getIngredientsRecipe(option){
    
    //captura los ingredientes ingresados por el usuario
    var ingredients = getSearchBarContent();

    //Crea url para buscar la receta
    var url = api + option + "?ingredients=" + ingredients + "&" + number + "00" + key;

    //Obtengo el json de la consulta
    var json = await getJSON(url);

    //Selecciono una receta aleatoria de las obtenidas
    var index = Math.floor(Math.random() * (99 - 0) + 0);   

    //Obtendo id de la receta
    var recipeID = json[index].id;

    //Creo url de la receta
    var recipeURL = api + recipeID + "/information?includeNutrition=false" + key;

    //Obtengo json receta
    var recipeJson = await getJSON(recipeURL);

    return recipeJson;
}

//Obtiene datos del json
function getData(json){

    //Obtengo los datos de la receta
    var imageURL = json.image;
    var title = json.title;

    var instructions = removeHTMLTags(json.instructions);

    var ingredients = "";
    var i = 0;
    for(i; i<json.extendedIngredients.length; i++){
        ingredients = ingredients + json.extendedIngredients[i].original + ", ";
    }
    ingredients = ingredients.slice(0, -2); //elimino el el ultimo ", "    

    var data = [imageURL, title, ingredients, instructions];

    return data;
}

//Imprime los datos en sus campos correspondientes del documento html
function showRecipe(imageURL, title, ingredients, instructions){

    recipeImage.src = imageURL;
    recipeTitle.innerText = title;
    recipeIngredients.innerText = ingredients;
    recipeText.innerText = instructions;

    recipeSection.style = "display:inline;";
}

//Obtiene el json a partir de la direccion url
async function getJSON(url){

    var response = await fetch(url);

    var json = await response.json();

    return json;
}

//Elimina los tags html del texto
function removeHTMLTags(texto) {

    if (texto) {
        var strHtmlCode = texto;

        strHtmlCode = strHtmlCode.replace(/&(lt|gt);/g,
        function (strMatch, p1) {
            return (p1 == "lt") ? "<" : ">";
        });
        var strTagStrippedText = strHtmlCode.replace(/<\/?[^>]+(>|$)/g, "");

    }
    return strTagStrippedText;
}

//Obtiene el contenido de la barra de busqueda
function getSearchBarContent(){

    var input = searchBar.value;

    addHistoryItem(input);

    var content = "";
    var i = 0;
    
    for(i; i<input.length; i++){

        var char = input.charAt(i);
        if(char == ","){
            content = content + ",+";
        }else if(char == " "){}
        else content = content + char; 
    }
    return content;
}
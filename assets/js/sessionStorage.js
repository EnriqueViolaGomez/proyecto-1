var searchBar = document.getElementById("searchBar");
var options = document.getElementById('options');

function stateStorage(){

    var colour = document.body.style.backgroundColor;
    sessionStorage.setItem('color', colour);
}

function onStartState(){

    document.body.style.backgroundColor = sessionStorage.getItem('color');
}

function switchMode(){

    var color = sessionStorage.getItem('color');
    if(color == "white"){
        document.body.style.backgroundColor = "black";
    }else{
        document.body.style.backgroundColor = "white";
    }
    stateStorage();
}

function showSearchHistory(){

    var index = sessionStorage.getItem("index");
    
    for(i=0 ; i<index ; i++) {
        var recipe = sessionStorage.getItem("recipes"+i);
        options.innerHTML+='<li>'+recipe+'</li>';
    }

    document.body.onclick=function(event) {
        if(event.target!=searchBar)
            options.style.display='none';
    }

    searchBar.onclick=function() {
        this.value='';
        options.style.display='block';
    }

    for(i=0; i<index ;i++) {
    
        options.getElementsByTagName('li')[i].onclick = function(){
            searchBar.value= this.textContent;
        }    
    }
}

function addHistoryItem(search){


    var index = sessionStorage.getItem("index");
    index++;
    if( index==null || index>=6){
        index = 0;
    }
    sessionStorage.setItem("index", index);
    sessionStorage.setItem("recipes"+index, search);
}
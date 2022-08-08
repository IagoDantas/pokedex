const POKEMONNAME = document.querySelector('.pokemon-name');
const POKEMONNUMBER = document.querySelector('.pokemon-number');
const POKEMONIMAGE = document.querySelector('.pokemon-img');
const FORM = document.querySelector('.form');
const INPUT = document.querySelector('.input-search');
const BUTTONPREV = document.querySelector('.btn-prev')
const BUTTONNEXT = document.querySelector('.btn-next')
let searchPokemon = 1;
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;    
    }
}
const renderPokemon = async (pokemon) =>{
    
    POKEMONNAME.innerHTML = "loading...";
    POKEMONNUMBER.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    if(data){
        POKEMONNAME.innerHTML = data.name;
        POKEMONNUMBER.innerHTML = `${data.id} -`;
        searchPokemon = data.id;
        POKEMONIMAGE.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        POKEMONIMAGE.style.display = 'block';

        INPUT.value = '';
    }
    else{
        POKEMONNAME.innerHTML = 'Not Found';
        POKEMONNUMBER.innerHTML = '';
        POKEMONIMAGE.style.display = 'none';
    }
}

FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPokemon(INPUT.value.toLowerCase());
});

BUTTONNEXT.addEventListener('click', () => {
    searchPokemon++;
    renderPokemon(searchPokemon);
});

BUTTONPREV.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon--;
        renderPokemon(searchPokemon);
    }   

});

renderPokemon(searchPokemon);
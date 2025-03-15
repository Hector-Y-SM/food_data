import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import '../src/consume.ts';
import { filtCategory, filtName, name } from '../src/consume.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    
    <br>
    <input placeholder="ingresa el nombre" id="input_search"> <br>
    <button id="btn_get_all"> todos los alimentos </button> 
    <button id="btn_get_category"> buscar categoria </button>
    <button id="btn_get_name"> buscar nombre </button>

    <div id="results"></div>
  </div>
`

const input = <HTMLInputElement>document.getElementById("input_search");
const btn_get_all = document.getElementById("btn_get_all");
const btn_get_category = document.getElementById("btn_get_category");
const btn_get_name = document.getElementById("btn_get_name");
const div_result = document.getElementById("results");


btn_get_all?.addEventListener('click', () => {
  div_result!.innerHTML = "";
  const p = document.createElement('p');
  name().then((data) => {
    if (data) {
      data.forEach((element) => {
        p.innerHTML += element.Alimento + "<br>";
      });
    } else {
      p.innerHTML = "No hay datos";
    }
  });

  div_result?.appendChild(p);
})

btn_get_category?.addEventListener('click', ()=>{
  div_result!.innerHTML = "";
  const p = document.createElement('p');
  filtCategory(input.value).then((data) => {
    console.log(data)
    if (data) {
      data.forEach((element) => {
        p.innerHTML += element.Alimento + "<br>";
      });
    } else {
      p.innerHTML = "No hay datos";
    }
  });

  div_result?.appendChild(p);
});

btn_get_name?.addEventListener('click', () => {
  div_result!.innerHTML = '';
  const p = document.createElement('p');
  filtName(input.value).then((data) => {
    console.log(data)
    if (data) {
      data.forEach((element) => {
        p.innerHTML += element.Alimento + "<br>";
      });
    } else {
      p.innerHTML = "No hay datos";
    }
  });

  div_result?.appendChild(p);
  
})
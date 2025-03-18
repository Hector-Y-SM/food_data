import './style.css';
import '../src/consume.ts';
import { filtCategory, filtName, name } from '../src/consume.ts';
import { generateResults } from './utils/results.ts';

const input = <HTMLInputElement>document.getElementById("input_search");
const btn_get_all = document.getElementById("btn_get_all");
const btn_get_category = document.getElementById("btn_get_category");
const btn_get_name = document.getElementById("btn_get_name");
const div_result = <HTMLElement>document.getElementById("results");
const div_details = <HTMLElement>document.getElementById("details");
const btn_search = <HTMLButtonElement>document.getElementById("btn_search");
let value = 0;

function search(value: number) {
  switch (value) {
    case 1: 
        if (!div_result) return;
        div_result.innerHTML = "";
        div_details!.style.display = "none"; 
        filtCategory(input.value).then((data) => {
          if (data) {
            data.forEach((element) => {
              generateResults(element);
            });
          } else {
            const p = document.createElement('p');
            p.innerHTML = "No hay datos";
            div_result?.append(p);
          }
        });
        break;
    case 2:
      if (!div_result) return;
      div_result.innerHTML = "";
      div_details!.style.display = "none"; 
      filtName(input.value).then((data) => {
        if (data) {
          data.forEach((element) => {
            generateResults(element);
          });
        } else {
          const p = document.createElement('p');
          p.innerHTML = "No hay datos";
          div_result?.append(p);
        }
      });
      break;
    default:
  }
}


btn_get_all?.addEventListener('click', () => { 
  input.placeholder = "Ingresa un alimento o una categoria";
  if (!div_result) return;
  div_result.innerHTML = "";
  div_details!.style.display = "none"; 
  name().then((data) => {
    if (data) {
      data.forEach((element) => {
        generateResults(element, true);
      });
    } else {
      const p = document.createElement('p');
      p.innerHTML = "No hay datos";
      div_result?.append(p);
    }
  });
});

btn_get_category?.addEventListener('click', () =>{ input.placeholder = "ej. Frutas"; value = 1; });
btn_get_name?.addEventListener('click', () => { input.placeholder = "ej. agua"; value = 2; });
btn_search?.addEventListener('click', () => { search(value); });
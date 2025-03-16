import './style.css';
import '../src/consume.ts';
import { filtCategory, filtName, name } from '../src/consume.ts';
import type { Data } from './interfaces/data.ts';

const input = <HTMLInputElement>document.getElementById("input_search");
const btn_get_all = document.getElementById("btn_get_all");
const btn_get_category = document.getElementById("btn_get_category");
const btn_get_name = document.getElementById("btn_get_name");
const div_result = document.getElementById("results");
const div_details = document.getElementById("details");


btn_get_all?.addEventListener('click', () => {
  div_result!.innerHTML = "";
  name().then((data) => {
    if (data) {
      data.forEach((element) => {
        const p = document.createElement('p');
        p.innerHTML = element.Alimento;

        const btn = document.createElement('button');
        btn.textContent = 'mostrar';

        btn.addEventListener('click', () => {
          filtName(element.Alimento).then((data) => {
            if(data) {
              get_data(data[0]);
            }
          });
        });

        div_result?.append(p, btn);
      });
    } else {
      const p = document.createElement('p');
      p.innerHTML = "No hay datos";
      div_result?.append(p);
    }
  });
});

btn_get_category?.addEventListener('click', ()=>{
  div_result!.innerHTML = "";
  filtCategory(input.value).then((data) => {
    if (data) {
      data.forEach((element) => {
        const p = document.createElement('p');
        p.innerHTML = element.Alimento;

        const btn = document.createElement('button');
        btn.textContent = 'mostrar';

        btn.addEventListener('click', () => get_data(element));
        div_result?.append(p, btn);
      });
    } else {
      const p = document.createElement('p');
      p.innerHTML = "No hay datos";
      div_result?.append(p);
    }
  });
});

btn_get_name?.addEventListener('click', () => {
  div_result!.innerHTML = '';
  filtName(input.value).then((data) => {
    if (data) {
      data.forEach((element) => {
        const p = document.createElement('p');
        p.innerHTML = element.Alimento;

        const btn = document.createElement('button');
        btn.textContent = 'mostrar';

        btn.addEventListener('click', () => get_data(element));
        div_result?.append(p, btn);
      });
    } else {
      const p = document.createElement('p');
      p.innerHTML = "No hay datos";
      div_result?.append(p);
    }
  });
});

function get_data(element: Data) {
  if (!div_details) return;
  div_details.innerHTML = '';

  const label_key = [
    { label: 'Alimento:', key: element.Alimento },
    { label: 'Azúcar Por Equivalente G:', key: element.AzucarPorEquivalenteG },
    { label: 'Cantidad:', key: element.Cantidad },
    { label: 'Calcio (mg):', key: element.Calciomg },
    { label: 'Carbohidratos:', key: element.Carbohidratos },
    { label: 'Categoría:', key: element.Categoría },
    { label: 'Colesterol (mg):', key: element.Colesterolmg },
    { label: 'Energía (Kcal):', key: element.EnergíaKcal },
    { label: 'Etanol (g):', key: element.Etanolg },
    { label: 'Fibra:', key: element.Fibra },
    { label: 'Fósforo (mg):', key: element.Forforomg },
    { label: 'Grasa Monoinsaturada (g):', key: element.GrasaMonoinsaturadag },
    { label: 'Grasa Poliinsaturada (g):', key: element.GrasaPoliinsaturadag },
    { label: 'Grasa Saturada (g):', key: element.GrasaSaturadag },
    { label: 'Hierro (mg):', key: element.Hierromg },
    { label: 'Índice Calórico (IC):', key: element.IC },
    { label: 'Índice Glucémico (IG):', key: element.IG },
    { label: 'Lípidos:', key: element.Lípidos },
    { label: 'Peso Bruto (g):', key: element.PesoBrutoG },
    { label: 'Peso Neto (g):', key: element.PesoNetoG },
    { label: 'Potasio (mg):', key: element.Potasiomg },
    { label: 'Proteina:', key: element.Proteína },
    { label: 'Seleniou (g):', key: element.Selenioug },
    { label: 'Sodio (mg):', key: element.Sodiomg },
    { label: 'Unidad:', key: element.Unidad },
    { label: 'Vitamina A (ug):', key: element.VitaminaAug },
    { label: 'Ácido Ascórbico (mg):', key: element.ÁcidoAscórbicomg },
    { label: 'Ácido Fólico (ug):', key: element.ÁcidoFólicoug },
  ];

  label_key.forEach(({ label: labelText, key: keyText }) => {
    const label = document.createElement('label');
    const value = document.createElement('span');

    label.textContent = labelText;
    value.textContent = keyText ?? null;

    div_details.append(label, value, document.createElement('br'));
  });
}
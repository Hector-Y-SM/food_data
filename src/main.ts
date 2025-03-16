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
        const item = document.createElement("div");
        item.id = "result-item";
        const p = document.createElement('p');
        p.innerHTML = element.Alimento;

        const btn = document.createElement('button');
        btn.textContent = 'mostrar';
        item.appendChild(p);
        item.appendChild(btn);
        div_result?.appendChild(item);

        btn.addEventListener('click', (event) => {
          if (!div_details) return;

          div_details.innerHTML = ""; 

          filtName(element.Alimento).then((data) => {
            if (data) {
              get_data(data[0]); 
            }
          });
        
          // posicionar el div al lado del botón presionado
          const button = event.target as HTMLElement;
          const rect = button.getBoundingClientRect();
        
          div_details.style.display = "block";
          div_details.style.position = "absolute";
          div_details.style.top = `${rect.top + window.scrollY}px`; 
          div_details.style.left = `${rect.right + 10}px`; 
          
        });
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
        const item = document.createElement("div");
        item.id = "result-item";
        const p = document.createElement('p');
        p.innerHTML = element.Alimento;

        const btn = document.createElement('button');
        btn.textContent = 'mostrar';

        item.appendChild(p);
        item.appendChild(btn);
        div_result?.appendChild(item);
        btn.addEventListener('click', (event) => {
          get_data(element)
          
          const button = event.target as HTMLElement;
          const rect = button.getBoundingClientRect();
          
          div_details!.style.display = "block";
          div_details!.style.position = "absolute";
          div_details!.style.top = `${rect.top + window.scrollY}px`; 
          div_details!.style.left = `${rect.right + 10}px`; 
        });
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
        const item = document.createElement("div");
        item.id = "result-item";
        const p = document.createElement('p');
        p.innerHTML = element.Alimento;

        const btn = document.createElement('button');
        btn.textContent = 'mostrar';

        item.appendChild(p);
        item.appendChild(btn);
        div_result?.appendChild(item);

        btn.addEventListener('click', (event) => {
          get_data(element)

          const button = event.target as HTMLElement;
          const rect = button.getBoundingClientRect();
          
          div_details!.style.display = "block";
          div_details!.style.position = "absolute";
          div_details!.style.top = `${rect.top + window.scrollY}px`; 
          div_details!.style.left = `${rect.right + 10}px`; 
        });
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
  div_details.innerHTML = "";

  const label_key = [
    { label: "Alimento", key: element.Alimento },
    { label: "Azúcar Por Equivalente G", key: element.AzucarPorEquivalenteG },
    { label: "Cantidad", key: element.Cantidad },
    { label: "Calcio (mg)", key: element.Calciomg },
    { label: "Carbohidratos", key: element.Carbohidratos},
    { label: "Categoría", key: element.Categoría},
    { label: "Colesterol (mg)", key: element.Colesterolmg},
    { label: "Energía (Kcal)", key: element.EnergíaKcal},
    { label: "Etanol (g)", key: element.Etanolg},
    { label: "Fibra", key: element.Fibra},
    { label: "Fósforo (mg)", key: element.Forforomg},
    { label: "Grasa Monoinsaturada (g)", key: element.GrasaMonoinsaturadag},
    { label: "Grasa Poliinsaturada (g)", key: element.GrasaPoliinsaturadag},
    { label: "Grasa Saturada (g)", key: element.GrasaSaturadag},
    { label: "Hierro (mg)", key: element.Hierromg},
    { label: "Índice Calórico (IC)", key: element.IC},
    { label: "Índice Glucémico (IG)", key: element.IG},
    { label: "Lípidos", key: element.Lípidos},
    { label: "Peso Bruto (g)", key: element.PesoBrutoG},
    { label: "Peso Neto (g)", key: element.PesoNetoG},
    { label: "Potasio (mg)", key: element.Potasiomg},
    { label: "Proteína", key: element.Proteína},
    { label: "Selenio (g)", key: element.Selenioug},
    { label: "Sodio (mg)", key: element.Sodiomg},
    { label: "Unidad", key: element.Unidad},
    { label: "Vitamina A (ug)", key: element.VitaminaAug},
    { label: "Ácido Ascórbico (mg)", key: element.ÁcidoAscórbicomg},
    { label: "Ácido Fólico (ug)", key: element.ÁcidoFólicoug},
  ];

  const container = document.createElement("div");
  container.classList.add("object-container");

  label_key.forEach(({ label, key }) => {
    const row = document.createElement("div");
    row.classList.add("object-row");

    const labelSpan = document.createElement("span");
    labelSpan.classList.add("object-key");
    labelSpan.textContent = `"${label}"`;

    const valueSpan = document.createElement("span");
    valueSpan.classList.add("object-value");
    valueSpan.textContent = `: "${key ?? " "}"`; 
    row.append(labelSpan, valueSpan);
    container.appendChild(row);
  });

  div_details.appendChild(container);
  div_details.style.display = "block";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Cerrar";
  closeButton.classList.add("close-details");
  closeButton.addEventListener("click", () => {
    div_details!.style.display = "none"; 
  });

  div_details.appendChild(closeButton);
}

window.onscroll = function() {
  if(document.documentElement.scrollTop > 100) {
    document.querySelector('.go-top-container')?.classList.add('show');
  } else {
    document.querySelector('.go-top-container')?.classList.remove('show');
  }
}

document.querySelector('.go-top-container')?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
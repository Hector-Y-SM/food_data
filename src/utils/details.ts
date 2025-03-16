import type { Data } from "../interfaces/data";

/**
 * function that shows the details of the object in the div_details 
 * @param element type data, to extract all the properties of the object
 * @param div_details shows the details of the object in the div_details
 */
export function showDetails(element: Data, div_details: HTMLElement) {
    
  // dictionary with the labels and keys of the object
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
  
    // create the container for the details and append it to the div
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
  
    div_details!.appendChild(container);
    div_details!.style.display = "block";
  
    const closeButton = document.createElement("button");
    closeButton.textContent = "Cerrar";
    closeButton.classList.add("close-details");
    closeButton.addEventListener("click", () => {
      div_details!.style.display = "none"; 
    });
  
    div_details!.appendChild(closeButton);
}
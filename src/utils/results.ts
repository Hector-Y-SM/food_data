import { filtName } from "../consume";
import type { Data } from "../interfaces/data";
import { showDetails } from "./details";

/**
 * function that generates the results of the search and displays them in the div_results
 * 
 * @param element type data, to extract all the properties of the object
 * @param div_details div where the values of the object will be shown (element parameter)
 * @param div_result div where the options/records that are in the db will be shown
 * @param flag we force the function to get the whole object and not just its name
 * @returns 
 */
export function generateResults(element: Data, div_details: HTMLElement, div_result: HTMLElement, flag?: boolean) {
    const item = document.createElement("div");
    item.id = "result-item";
    const p = document.createElement('p');
    p.innerHTML = element.Alimento;
  
    const btn = document.createElement('button');
    btn.textContent = 'mostrar';
  
    item.appendChild(p);
    item.appendChild(btn);
    div_result?.appendChild(item);
  
    btn.addEventListener('click', () => {
      if (!div_details) return;
      div_details.innerHTML = "";
      if (flag){
        filtName(element.Alimento).then((data) => {
          if (data) {
            showDetails(data[0], div_details); 
          }
        });
      } else {
        showDetails(element, div_details)
      }
    });
}
import type { Data } from './interfaces/data';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { firebaseConfig } from './firebase_config.ts';



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, '/');

/**
 * función que realiza un fetch a un archivo json local y devuelve un arreglo de todos los alimentos (key : value)
 * 
 * @returns un arreglo de objetos de tipo `Data` que contiene el key y value de todos los alimentos disponibles en la interfaz
 */
async function name() {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
        const data = <Data[]>snapshot.val();
        data.map( x => ( {Alimento: x.Alimento} ));
        console.log(data);
        return data;
    } else {
        console.log("No data available at this location.");
        return null;
    }
};


/**
 * función que recibe un parámetro de texto, realiza un fetch a un archivo json local y
 * filtra los alimentos que coinciden con la cadena (categoria) proporcionada y devuelve 
 * un arreglo con los alimentos que tengan coincidencia
 * 
 * @param input cadena de texto que se utiliza para filtrar los alimentos en el archivo json,
 *              el filtro se realiza comprobando si el nombre de la categoria coincide con el texto proporcionado
 * 
 * @returns un arreglo de objetos de tipo `Data` que contienen alimentos que su categoria coincide con el parámetro `input`.
 */
async function filtCategory(input: string) {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
        const data = <Data[]>snapshot.val();
        const category = data.filter( x =>  x.Categoría == input);
        console.log(category)
        return category;
    } else {
        console.log("No data available at this location.");
        return null;
    }
}; 


/**
 * función que recibe un parámetro de texto, realiza un fetch a un archivo json local y
 * filtra los alimentos que contienen la cadena proporcionada y devuelve un arreglo con los alimentos que tengan coincidencia
 * 
 * @param input cadena de texto que se utiliza para filtrar los alimentos en el archivo json,
 *              el filtro se realiza comprobando si el nombre del alimento incluye el texto proporcionado
 * 
 * @returns un arreglo de objetos de tipo `Data` que contienen alimentos cuyo nombre incluye el parámetro `input`
 */
async function filtName(input: string) {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
        const data = <Data[]>snapshot.val();
        const category = data.filter(x => x.Alimento.includes(input));
        console.log(category)
        return category;
    } else {
        console.log("No data available at this location.");
        return null;
    }
};


name() 
filtCategory('Alimentos libres en energía');
filtName('agua');
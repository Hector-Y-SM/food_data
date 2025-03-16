import type { Data } from './interfaces/data';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";
import { firebaseConfig } from './firebase_config.ts';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);

/**
 * Function that queries the Firebase database.
 * 
 * @returns A promise that resolves to an array of `Data` objects 
 * containing information about the available food items, or null if no data is found.
 */
export async function name(): Promise<Data[] | null>  {
    try {
        const snapshot = await get(child(dbRef,'/'));
        if (snapshot.exists()) {
            const data = <Data[]>snapshot.val();
            const obj = data.map( x => ({Alimento: x.Alimento}));
            return obj as Data[];
        } else {
            console.log("No data available at this location.");
            return null;
        }        
    } catch(err) {
        console.log(err);
        return null;
    }
};


/**
 * Function that receives a text parameter, queries the Firebase database,
 * filters the food items that match the provided string (category), 
 * 
 * @param input Text string used to filter the food items in the database.
 *              The filtering is done by checking if the category name matches the provided text.
 * 
 * @returns An array of `Data` objects containing food items whose category matches the `input` parameter.
 */
export async function filtCategory(input: string): Promise<Data[] | null> {
    try{
        const snapshot = await get(child(dbRef,'/'));
        if (snapshot.exists()){
            const data = <Data[]>snapshot.val();
            const category = data.filter( x =>  x.Categoría == input);
            return category;
        } else{
            console.log("No data available at this location.");
            return null;
        }
    } catch (err){
        console.log(err);
        return null;
    }
}; 


/**
 * Function that receives a text parameter, queries the Firebase database,
 * filters the food items that contain the provided string, 
 * 
 * @param input Text string used to filter the food items in the database.
 *              The filtering is done by checking if the food name includes the provided text.
 * 
 * @returns An array of `Data` objects containing food items whose name includes the `input` parameter.
 */
export async function filtName(input: string): Promise<Data[] | null>{
    try{
        const snapshot = await get(child(dbRef,'/'));
        if (snapshot.exists()) {
            const data = <Data[]>snapshot.val();
            const name = data.filter(x => x.Alimento.includes(input));
            return name;
        } else{
            console.log("No data available at this location.");
            return null;
        }
    } catch (err){
        console.log(err);
        return null;
    }
};
import React, { useEffect, useState } from "react";
import { doc, getDoc, collection, query, where, getDocs, onSnapshot, addDoc} from "firebase/firestore";
import { db } from "../firebase";
import { getWeekDays } from "../weekdays";
import { WeekCard } from "../components/weekcard";
import { render } from "@testing-library/react";
import { Navbar } from '../Navbar';
import "../App.css";



export const WeeklyView = () => {
    const colRef = collection(db, localStorage.getItem("name"));
    let docs = [];
    let values = [];
    let count = 0;
    const [weekAdded, setWeekAdded] = useState(false);
    const [valuesState, setValuesState] = useState([]);

    onSnapshot(colRef, (snapshot) => {
        try {
            docs = [];
            snapshot.docs.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            })
            getValues();
        } catch(err) {

        } finally {
            if (!weekAdded) {
                setWeekAdded(true);
            }
        }
    })

    useEffect(() => {

      }, valuesState);


    

    const getValues = () => {
        while (docs.length != 0) {
            let days = getWeekDays(docs[0].formatdate);
            let weekOf = days[0].startdate + " - " + days[0].enddate;
            let tips = 0;
            let hours = 0;

            for(let i = 0; i < days.length; i++) {
                for(let j = 0; j < docs.length; j++) { 
                    if(docs[j].month == days[i].month && docs[j].day == days[i].date && docs[j].year == days[i].year) {
                        tips += Number(docs[j].tip);
                        hours += Number(docs[j].hours);
                        docs.splice(j, 1);
                    }
                }
            }   

            values.push({
                week: weekOf,
                hours: hours,
                tips: tips
            });
        }
        values.reverse();

        setValuesState(values);
    }

    return (
        <div>
            <Navbar />
            <div className="weekcontainer">
                { weekAdded &&
                    <div>
                        {valuesState.map((value) => (
                        <WeekCard value={value}/>
                        ))}
                    </div>
                }   
            </div> 
        </div>
               
    )
}
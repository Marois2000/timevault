import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, collection, query, where, getDocs, onSnapshot, addDoc} from "firebase/firestore";
import { getWeekDays } from "../weekdays";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../Navbar';
import "../App.css";
import { quotes } from "../quotes.js";




export const Home = () => {
    const colRef = collection(db, localStorage.getItem("name"));
    let docs = [];
    const date = new Date();
    const days = getWeekDays(date);
    const rngQuote = Math.floor(Math.random() * quotes.length-1);

    const [hours, setHours] = useState(0);
    const [tip, setTip] = useState(0);
    const [weekHours, setWeekHours] = useState(0);
    const [weekTips, setWeekTips] = useState(0);
    const [yearTips, setYearTips] = useState(0);
    const navigate = useNavigate();

    

    onSnapshot(colRef, (snapshot) => {
        docs = [];
        snapshot.docs.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id })
        })
        updateFields();
    })

    const addEntry = (hours, tip) => {

        if(!isNaN(tip) && !isNaN(hours)) {
            console.log(isNaN(tip) && isNaN(hours));

            let sameDay = false;
            let dayString = String(date.getDate());
            let monthString = String(date.getMonth()+1);
            
            if(dayString.length == 1) {
                dayString = "0" + dayString;
            }
    
            if(monthString.length == 1) {
                monthString = "0" + monthString;
            }
    
            const currentid = date.getFullYear() + "-" + monthString + "-" + dayString;
            for(let i = 0; i < docs.length; i++) {
                if(docs[i].formatdate === currentid) {
                    sameDay = true;
                    break;
                } 
            }
    
            if (!sameDay) {
                addDoc(colRef, {
                    hours: hours,
                    tip: tip,
                    year: date.getFullYear(),
                    day: date.getDate(),
                    month: date.getMonth() + 1,
                    formatdate: currentid
                }).then(() => {
                    setHours(0);
                    setTip(0);
                    alert("Log Added!")
                })
            }
        } else {
            alert("Try Again: Please Enter a Number.")
        }
    }

    const updateFields = () => {
        let yearTipTotal = 0;
        for(let i = 0; i < docs.length; i++) {
            if(docs[i].year == date.getFullYear()) {
                yearTipTotal += Number(docs[i].tip);
            }
        }
        setYearTips(yearTipTotal);

        let hoursCount = 0;
        let tipCount = 0;
        for(let i = 0; i < docs.length; i++) {
            for(let j = 0; j < days.length; j++) {
                
                if(docs[i].month == days[j].month && docs[i].day == days[j].date && docs[i].year == days[j].year) {
                    tipCount += Number(docs[i].tip);
                    hoursCount += Number(docs[i].hours);
                }
            }
        }

        setWeekHours(hoursCount);
        setWeekTips(tipCount);
    }


    return <div className="home">
        <Navbar />
        <div className="log">
            <div>
                <h2>Welcome, {localStorage.getItem("name")}</h2>
                <input type="text" placeholder="Input Hours"  onChange={(e) => setHours(e.target.value)}/>
                <input type="text" placeholder="Input Tip" onChange={(e) => setTip(e.target.value)}/>
                <button className="button" onClick={() => addEntry(hours, tip)}>Submit</button>
                <p>(This will automatically log this date)</p>
            </div>
            <div className="quote">
                <h1>{quotes[rngQuote].text}</h1>
                <h3>-{quotes[rngQuote].from}</h3>
            </div>
        </div>
        <div className="totals">
            <div>
                <h1>Weekly hours</h1>
                <p>{weekHours}</p>
            </div>
            <div>
                <h1>Weekly Tips</h1>
                <p>${weekTips}</p>
            </div>
            <div>
                <h1>Yearly Tips</h1>
                <p>${yearTips}</p>
            </div>
        </div>
    </div>
}
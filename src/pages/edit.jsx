import React, { useState } from "react";
import { collection, onSnapshot, addDoc, updateDoc, doc} from "firebase/firestore";
import { db } from "../firebase";
import { getWeekDays } from "../weekdays";
import { useNavigate } from "react-router-dom";


export const Edit = () => {

    const [dateChoice, setDateChoice] = useState("");
    const [tip, setTip] = useState("");
    const [hours, setHours] = useState("");
    const navigate = useNavigate();

    const colRef = collection(db, localStorage.getItem("name"));
    let docs = [];
    const date = new Date();
    const days = getWeekDays(date);

    onSnapshot(colRef, (snapshot) => {
        docs = [];
        snapshot.docs.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id })
        })
        console.log(docs);
    })


    const editLog = (hours, tip) => {
        let noneFound = true;
        for(let i = 0; i < docs.length; i++) {
            console.log(docs[i].formatdate + " / " + dateChoice);
            if(docs[i].formatdate == dateChoice) {
                updateDoc(doc(db, localStorage.name, docs[i].id), {
                    hours: hours,
                    tip: tip
                }).then(() => {
                    alert("Log Updated!");
                })
                noneFound = false;
            }
        }

        if(noneFound) {
            alert("No Log Found");
        }
    }

    return <div className="edit">
        <div className="title">
            <h1>TimeVault</h1>
        </div>
        <div className="editfields">
            <div>
                <h1>Select Date to Edit</h1>
                <input type="date" name="editdate" id="editdate" onChange={(e) => setDateChoice(e.target.value)}/>
                <input type="text" placeholder="Input Hours"  onChange={(e) => setHours(e.target.value)}/>
                <input type="text" placeholder="Input Tip" onChange={(e) => setTip(e.target.value)}/>
                <button onClick={() => editLog(hours, tip)}>Submit</button>
                <button onClick={() => navigate("/home")}>Return Home</button>
            </div>
        </div>
    </div>
}
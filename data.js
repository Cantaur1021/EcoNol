// import { exportedUserName } from "./src/Login";
// import { getDoc, doc, getDocs } from "firebase/firestore";
// import { db } from "./firebaseconfig";
// import { useState } from "react";

import { waitForPendingWrites } from "firebase/firestore";


// const [dataValue, setData] = useState([]);


// getDocs(collection(db, '/users/Cantaur1021/nolCards')).then(docSnap => {
//     let data = []
//     docSnap.forEach((doc) => {
//         data.push({
//             ...doc.data(),
//             id: doc.id
//         });

//     })
//     setData(data)
//     console.log(dataValue)
// })



const dataValue = [
    {
        nolNumber: '20928292',
        credit: 50,
        nolPoints: '75',
        type: 'Water Bottle',
        location: 'Al Warqa',
        time: '5:03 PM'
    },
    {
        nolNumber: '20928292',
        credit: '50',
        nolPoints: '75',
        type: 'Water Bottle',
        location: 'Al Warqa',
        time: '5:03 PM'
    },
    {
        nolNumber: '20928292',
        credit: '50',
        nolPoints: '75',
        type: 'Water Bottle',
        location: 'Al Warqa',
        time: '5:03 PM'
    },
    {
        nolNumber: '20928292',
        credit: '50',
        nolPoints: '75',
        type: 'Water Bottle',
        location: 'Al Warqa',
        time: '5:03 PM'
    },
    {
        nolNumber: '20928292',
        credit: '50',
        nolPoints: '75',
        type: 'Water Bottle',
        location: 'Al Warqa',
        time: '5:03 PM'
    }
]
export default dataValue;



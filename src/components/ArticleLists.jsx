// import React, {useState, useEffect, useRef} from 'react'
// import '../Styles/ArticleList.css'
// import Article from './Article'
// import fetchJsonp from "fetch-jsonp";

// function ArticleLists() {

//       const [flightData, setFlightData] = useState([])
//       const [isChecked, setIsChecked] = useState(false);
//       const [filterByAlliance, setFilterByAlliance] = useState('')
//       const [results, setResults] = useState([]);
//       const [OWFilter, setOWFilter] = useState('')
//       const [STFilter, setSTFilter] = useState('')
//       const [SAFilter, setSAFilter] = useState('')

//       const filterLabels = [
//         { id:0, value: 'OW', name: 'One World', checked: false},
//         { id:1, value: 'ST', name: 'Sky Team', checked: false},
//         { id:2, value: 'SA', name: 'Star Alliance', checked: false}
//       ]

//       const [checkedData, setcheckedData] = useState([
//           {checked: false}
//       ])

//        function JSONP() {
//             fetchJsonp("https://kayak.com/h/mobileapis/directory/airlines/homework", {
//               jsonpCallback: "jsonp"
//             })
//               .then((res) => res.json())
//               .then((data) =>setFlightData(data));
//           }       

//         // const handleCheckboxChange =(event)=>{
//             let infos = [...checkedData];
//             if()
//             infos[index] = {...infos[index], checked: event.target.checked};   

//             setcheckedData([...infos]);            
            
//             // infos.map(i => {
//             //   if(i.checked && i.id === index){
//             //     setFilterByAlliance(i.value)
//             //   }      
//             //   if(!i.checked && i.id === index){
//             //     setFilterByAlliance('')
//             //   }         
//             // })

//           }
//             console.log(checkedData)


//         useEffect(() => {
//           JSONP()     

//           if(filterByAlliance === ''){
//             setResults(flightData)
//           }   

//         }, [])
        
        
//         useEffect(() => {
          
//           let unFilteredData = [...flightData]       
          
//           if(filterByAlliance === ''){
//             setResults(flightData)
//           }   
                            
//           if(filterByAlliance === 'OW'){
//             unFilteredData = unFilteredData.filter(flight => flight.alliance === 'OW')
//           }

//           if(filterByAlliance === 'ST'){
//             unFilteredData = unFilteredData.filter(flight => flight.alliance === 'ST')
//           }

//           if(filterByAlliance === 'SA'){
//             unFilteredData = unFilteredData.filter(flight => flight.alliance === 'SA')
//           }          
          
//           setResults(unFilteredData)

//         }, [flightData, checkedData, filterByAlliance])
      

  
//   return (
//     <div className="articleList">
//         <div className="articleListHeaders">
//             <h1 className="articleListHeading">
//                 Airlines
//             </h1>
//             <span className="articleListFilter">
//                 Filter by Alliance
//             </span>
//             <div className="articleListCheckboxes">
//             <label htmlFor="">
//                 <input type="checkbox" value='OW' onChange={(e) => handleCheckboxChange(e)} />
//                 <span>OW</span>
//             </label>
//             <label htmlFor="">
//                 <input type="checkbox" value='ST' onChange={(e) => handleCheckboxChange(e)} />
//                 <span>ST</span>
//             </label>
//             <label htmlFor="">
//                 <input type="checkbox" value='SA' onChange={(e) => handleCheckboxChange(e)} />
//                 <span>SA</span>
//             </label>
                  
//             </div>
//         </div>
//           <div className="col">
//             <div className="row">
//               { results ?
//                 (results.map((flight, i) => {
//                   return <Article key={i} flightData={flight} />
//                 })) : (<h1>Loading...</h1>)
//               }
//           </div>
//         </div>   
//       </div>       
//   )
// }

// export default ArticleLists
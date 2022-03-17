import React, {useState, useEffect, useRef} from 'react'
import '../Styles/ArticleList.css'
import Article from './Article'
import fetchJsonp from "fetch-jsonp";

function ArticleList() {

      const [flightData, setFlightData] = useState([])
      const [isChecked, setIsChecked] = useState(false);
      const [filterByAlliance, setFilterByAlliance] = useState({
        OW : '',
        ST: '',
        SA: ''
      })
      const [results, setResults] = useState([]);
     

      const filterLabels = [
        { id:0, value: 'OW', name: 'One World', checked: false},
        { id:1, value: 'ST', name: 'Sky Team', checked: false},
        { id:2, value: 'SA', name: 'Star Alliance', checked: false}
      ]

      const [checkedData, setcheckedData] = useState(filterLabels)

       function JSONP() {
            fetchJsonp("https://kayak.com/h/mobileapis/directory/airlines/homework", {
              jsonpCallback: "jsonp"
            })
              .then((res) => res.json())
              .then((data) =>setFlightData(data));
          }       

        const handleCheckboxChange =(event, index)=>{
            let infos = [...checkedData];
            infos[index] = {...infos[index], value: event.target.value, checked: event.target.checked};   
            setcheckedData([...infos]);            
            
            const getValue = event.target.value;

            infos.map(i => {
              if(i.checked && i.id === index && i.value === 'OW'){
                setFilterByAlliance(prevState => ({
                  ...prevState,
                  OW: i.value
               })); }

              if(!i.checked && i.id === index && i.value === 'OW'){
                setFilterByAlliance(prevState => ({
                  ...prevState,
                  OW: ''
               })); }
               
              if(i.checked && i.id === index && i.value === 'ST'){
                setFilterByAlliance(prevState => ({
                  ...prevState,
                  ST: i.value
               })); }

              if(!i.checked && i.id === index && i.value === 'ST'){
                setFilterByAlliance(prevState => ({
                  ...prevState,
                  ST: ''
               })); }

              if(i.checked && i.id === index && i.value === 'SA'){
                setFilterByAlliance(prevState => ({
                  ...prevState,
                  SA: i.value
               })); }

              if(!i.checked && i.id === index && i.value === 'SA'){
                setFilterByAlliance(prevState => ({
                  ...prevState,
                  SA: ''
               })); }

              //   if(!i.checked && i.id === index){
              //     setFilterByAlliance('')                                   
              // }
            })
          }
            console.log(filterByAlliance)


        useEffect(() => {
          JSONP()     

          if(filterByAlliance === ''){
            setResults(flightData)
          }   

        }, [])
        
        
        useEffect(() => {
          
          let unFilteredData = [...flightData]       
          
          if(filterByAlliance.OW === '' || filterByAlliance.ST === '' || filterByAlliance.SA === '' ){
            setResults(flightData)
          }   
                            
          if(filterByAlliance.OW === 'OW'){
            unFilteredData = unFilteredData.filter(flight => flight.alliance.includes('OW'))
          }

          if(filterByAlliance.ST === 'ST'){
            unFilteredData = unFilteredData.filter(flight => flight.alliance.includes('ST'))
          }

          if(filterByAlliance.SA === 'SA'){
            unFilteredData = unFilteredData.filter(flight => flight.alliance.includes('SA'))
          }       

          if(filterByAlliance.ST === 'ST' && filterByAlliance.OW === 'OW'){
            unFilteredData = unFilteredData.filter(flight => (flight.alliance === 'ST') && (flight.alliance === 'OW'))
          }    

          if(filterByAlliance.SA === 'SA' && filterByAlliance.OW === 'OW'){
            unFilteredData = unFilteredData.map(flight => { return flight.alliance.includes('SA') && flight.alliance.includes('OW') })
          }       
          if(filterByAlliance.ST === 'ST' && filterByAlliance.SA === 'SA'){
            unFilteredData = unFilteredData.filter(flight => flight.alliance.includes('ST') && flight.alliance.includes('SA'))
          }  

          if(filterByAlliance.ST === 'ST' && filterByAlliance.SA === 'SA' &&  filterByAlliance.OW === 'OW'){
            unFilteredData = unFilteredData.filter(flight => flight.alliance.includes('ST') && flight.alliance.includes('SA') &&
            flight.alliance.includes('OW'))
          }                   
                   
          setResults(unFilteredData)

        }, [flightData, checkedData, filterByAlliance])
      

  
  return (
    <div className="articleList">
        <div className="articleListHeaders">
            <h1 className="articleListHeading">
                Airlines
            </h1>
            <span className="articleListFilter">
                Filter by Alliance
            </span>
            <div className="articleListCheckboxes">
                  {filterLabels.map((item, index) =>
                  <>
                  <input 
                      key={item.id}
                      type="checkbox" 
                      value={item.value}
                      onChange={(e) => handleCheckboxChange(e, index)}
                  />
                  <p className="textbox-span"> {item.name}</p> 
              </> )}
            </div>
        </div>
          <div className="col">
            <div className="row">
              { results.length ?
                (results.map((flight, i) => {
                  return <Article key={i} flightData={flight} />
                })) : (<h1>Loading...</h1>)
              }
          </div>
        </div>   
      </div>       
  )
}

export default ArticleList
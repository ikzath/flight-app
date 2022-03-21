import React, {useState, useEffect, useRef} from 'react'
import '../Styles/ArticleList.css'
import Article from './Article'
import fetchJsonp from "fetch-jsonp";

function ArticleList() {

      const [flightData, setFlightData] = useState([])
      const [results, setResults] = useState([]);     
      const [filterByAlliance, setFilterByAlliance] = useState({});

      const filterLabels = [
        { value: 'OW', name: 'One World', checked: false},
        { value: 'ST', name: 'Sky Team', checked: false},
        { value: 'SA', name: 'Star Alliance', checked: false}
      ]

      const [checkedData, setcheckedData] = useState(filterLabels)

       function JSONP() {
          fetchJsonp("https://kayak.com/h/mobileapis/directory/airlines/homework", {
            jsonpCallback: "jsonp"
          })
            .then((res) => res.json())
            .then((data) => {
              setFlightData(data);
              setResults(data)
            });
          }       

        const onHandleChange = (event, index) => {

          let infos = [...checkedData]
          infos[index] = {...infos[index], checked: event.target.checked }
          setcheckedData([...infos])

          let filterByAllianceCopy = {...filterByAlliance}
            infos.forEach(item => {
              filterByAllianceCopy = {
                ...filterByAllianceCopy,
                [item.value] : item.checked ? item.value : '',
              }
          })
            setFilterByAlliance(filterByAllianceCopy)
        };
        
        useEffect(() => {
          JSONP()     
        }, [])        
        
        useEffect(() => {
          let unFilteredData = [...flightData];
          
          if(checkedData.some(i => i.checked)){
            unFilteredData = []
          }

          checkedData.forEach(i =>{
            if(i.checked){
            unFilteredData = [
              ...unFilteredData,
              ...flightData.filter(flight => flight.alliance === i.value)
            ]
          }})
          setResults(unFilteredData);
        }, [flightData, checkedData, filterByAlliance]);      

  
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
                      key={index}
                      type="checkbox" 
                      value={item.value}
                      onChange={(e) => onHandleChange(e, index)}
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
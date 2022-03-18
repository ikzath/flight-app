import React, {useState, useEffect, useRef} from 'react'
import '../Styles/ArticleList.css'
import Article from './Article'
import fetchJsonp from "fetch-jsonp";

function ArticleList() {

      const [flightData, setFlightData] = useState([])
      const [isChecked, setIsChecked] = useState([]);
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

          useEffect(() => {
          JSONP()     
        }, [])
        
        function onHandleChange(e){
          const { checked, value } = e.target
          if(checked){
            setIsChecked(prev => ([...prev, value]))
          } else
          setIsChecked(isChecked.filter((id) => id !== value));
        }
        console.log(isChecked)

        
        useEffect(() => {                 
                        
          let unFilteredData = [...flightData]      

          if(!isChecked.length) {
            setResults(flightData)
          }

          isChecked.forEach(value => {
            if(isChecked.length === 3) {
              unFilteredData = unFilteredData.filter(flight => !flight.alliance.includes('none'))
            }
            if(isChecked.length > 0 && isChecked.length < 3 ){
              unFilteredData = unFilteredData.filter(flight => flight.alliance.includes(value))
            }
            // unFilteredData = unFilteredData.filter(flight => flight.alliance === value)
          })
          setResults(unFilteredData)
        }, [isChecked, flightData])
      

  
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
                      onChange={(e) => onHandleChange(e)}
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
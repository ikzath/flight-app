import React, { useState } from 'react'
import '../Styles/Article.css'
import { Card, CardText, CardBody, CardTitle, CardGroup, CardImg } from 'reactstrap';


function Article({ flightData : { name, logoURL, alliance, phone, site}}) {

  const [style, setStyle] = useState({display : 'none'});

  const onMouseEventHandler = () => {
    setStyle({display: 'block'})
  }
  const onMouseLeaveHandler = () => {
    setStyle({display: 'none'})
  }

  let modifiedSite = site 
  modifiedSite =  modifiedSite.startsWith('https://' || 'https://en.') ? modifiedSite.slice(11, -1) : modifiedSite.slice(3, -1)
  modifiedSite = modifiedSite.length > 30 ? modifiedSite.slice(0, -20) : modifiedSite
  modifiedSite = modifiedSite.length > 50 ? modifiedSite.slice(0, -30) : modifiedSite

    let modifiedAlliance1;
    if(alliance === 'OW'){
      modifiedAlliance1 = 'Oneworld'
    }
    if(alliance === 'SA'){
      modifiedAlliance1 = 'Sky Alliance'
    }
    if(alliance === 'ST'){
      modifiedAlliance1 = 'Sky Team'
    }

  return (
      <div>
        <CardGroup className='cardGroup'>
          <Card className='card'  onMouseEnter={onMouseEventHandler} onMouseLeave={onMouseLeaveHandler}>
            <CardBody className='displayCard__contents'>
              <div className="cardImage">
              <CardImg src={'https://kayak.com' + logoURL} alt="" className="flightIcon" />
              </div>
              <div className="cardDetails">
              <CardTitle className='cardTitle' >{name}</CardTitle>
              <div style={style} className="extraCardDetails">
              <CardText className='cardText'>{modifiedAlliance1}</CardText>
              <CardText className='cardText'>{phone}</CardText>
              <CardText className='cardSite'>{modifiedSite}</CardText>
              </div>
              </div>
            </CardBody>
          </Card>
        </CardGroup>
    </div>  
)}

export default Article 
import React from 'react'
import '../Styles/Article.css'
import {
    Card, CardText, CardBody, CardTitle, CardDeck, CardGroup, CardImg, Row, Col
  } from 'reactstrap';


function Article({ flightData : { name, logoURL, alliance, phone, site}}) {


  return (
      <div className="Article">
        <CardGroup className='displayCard'>
          <Card className='displayCard__contents'>
            <CardBody style={{ display: 'flex'}}>
              <div className="cardImage">
              <CardImg src={'https://kayak.com' + logoURL} alt="" className="flightIcon" />
              </div>
              <div className="cardDetails">
              <CardTitle tag="h6" font-weight-bold='true' >{name}</CardTitle>
              {/* <CardText>{phone}</CardText>
              <CardText>{site}</CardText> */}
              <CardText>{alliance}</CardText>
              </div>
            </CardBody>
          </Card>
        </CardGroup>
    </div>  
)}

export default Article 
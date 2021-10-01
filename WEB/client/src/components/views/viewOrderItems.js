import React, {Component} from 'react';
import axios from 'axios';
import {Card, Col, Row} from "react-bootstrap";
import swat from "sweetalert2";


const SubmissionAlert1 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Order Accepted!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionAlert2 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Order Declined!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionFail = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}

class viewOrderItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderItems: [],
            temp:''
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/getItemsByOrder/${this.props.match.params.id}`)
            .then(response => {
                this.setState({orderItems: response.data});
            }).then(()=>{
                axios.get(`http://localhost:8080/api/order/${this.props.match.params.id}`)
                    .then(response => {
                        this.setState({temp: response.data.status});
                    })
            })
    }

    acceptOrder() {

        let order = {
            status:'Accepted',
        };

        axios.put(`http://localhost:8080/api/order/${this.props.match.params.id}`, order)
            .then(response => {
                SubmissionAlert1();
                window.location.reload(false);
            })
            .catch(error => {
                console.log(error.message);
                SubmissionFail();
            })
    }

    declineOrder() {

        let order = {
            status:'Declined',
        };

        axios.put(`http://localhost:8080/api/order/${this.props.match.params.id}`, order)
            .then(response => {
                SubmissionAlert2();
                window.location.reload(false);
            })
            .catch(error => {
                console.log(error.message);
                SubmissionFail();
            })
    }

    render() {
        return (
            <div>
                <div className=" container" style={{width: '80%'}}>
                    <div className="card" style={{width: '100%',position:"relative"}}>
                        <div className="container">
                            <h1 style={{textTransform:"uppercase",textAlign:"center"}} >Stock Items</h1>
                            <h3 style={{textTransform:"uppercase",textAlign:"right",textColor:'red'}} >{this.state.temp}</h3>
                            <Row xs={1} md={2} className="g-4">
                                {this.state.orderItems.length > 0 && this.state.orderItems.map((item, index) => (
                                    <Col>
                                        <Card className="category-card">
                                            {/*<Card.Img variant="top" img src={item.itemPic} alt="Category"  className="center w3-card-4"/>*/}
                                            <Card.Body>
                                                <Card.Title>
                                                    <h2 className="item_title">{item.itemName}</h2>&nbsp;
                                                </Card.Title>
                                                <Card.Text>
                                                    <h4 style={{color:"darkblue"}}>QTY: {item.qty}</h4>
                                                </Card.Text>
                                                <Card.Subtitle className="mb-2 text-muted">
                                                    <h6>Sub Total:{item.sub_total}</h6>
                                                </Card.Subtitle>
                                            </Card.Body>
                                            <Card.Footer>

                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                </div>
                {/*<button className="btn btn-warning "*/}
                {/*        onClick={this.acceptOrder()}>Accept*/}
                {/*</button>*/}
                {/*<button className="btn btn-danger "*/}
                {/*        onClick={this.declineOrder()}>Decline*/}
                {/*</button>*/}
            </div>
        )
    }
}

export default viewOrderItems;
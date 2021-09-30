import React, {Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
// import './stock.css'
import swat from "sweetalert2";
import {FormGroup} from "@material-ui/core";
import {Form, FormFeedback, Input, Label} from "reactstrap";
import {storage} from "../firebase";
import {Card} from "react-bootstrap";


const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Category Updated Successfully!',
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
const initialState = {
    id: '',
    supplierName: '',
    supplierCompany: '',
    supplierSpeciality:'',
    supplierPic:null,
    image:'',
    progress:0,
    supplier:{},


    touched: {
        supplierName: false,
        supplierCompany: false,
        supplierSpeciality: false,
        supplierPic: false,
    }
}

class EditCategoryAdmin extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {

            axios.get(`http://localhost:8080/api/supplier/${this.props.match.params.id}`)
            .then(response => {
                this.setState(
                    {

                        // supplierName: response.data.data.supplierName,
                        // supplierCompany: response.data.data.supplierCompany,
                        // supplierSpeciality: response.data.data.supplierSpeciality,
                        // supplierPic: response.data.data.supplierPic,

                        supplierName: response.data.supplierName,
                        supplierCompany: response.data.supplierCompany,
                        supplierSpeciality: response.data.supplierSpeciality,
                        supplierPic: response.data.supplierPic,


                    });
            })
            .catch(error => {
                alert(error.message)
            })

    }

    handleChange = e => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0]
            })



        }
    };
    //////////////////////

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate =(supplierName,supplierCompany,supplierSpeciality)=> {
        const errors = {
            supplierName: '',
            supplierCompany: '',
            supplierSpeciality:'',
        };
        if (this.state.touched.supplierName && supplierName.length < 3)
            errors.workout_name = 'Name should be >= 3 characters';

        if (this.state.touched.supplierCompany && supplierCompany.length < 3)
            errors.workout_theme = 'Company should be >= 3 characters';

        if (this.state.touched.supplierSpeciality && supplierSpeciality.length < 3)
            errors.workout_description = 'Speciality should be >= 3 characters';

        return errors;
    }
    async onSubmit(e) {
        e.preventDefault();



        const uploadTask = storage.ref(`supplierImages/${this.state.image.name}`).put(this.state.image);
        await uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                this.setState({
                    progress: progress
                });

            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("supplierImages")
                    .child(this.state.image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        this.setState({
                            supplier:{
                                supplierName: this.state.supplierName,
                                supplierCompany: this.state.supplierCompany,
                                supplierSpeciality: this.state.supplierSpeciality,
                                supplierPic: url
                            }

                        });

                    }).then(()=>{this.submit2();});

            }
        )

    }

    submit2(){
        if (this.state.supplierName.length < 3 || this.state.supplierSpeciality.length < 3 ||
            this.state.supplierCompany.length < 3) {
            this.validate(this.state.supplierName, this.state.supplierCompany, this.state.supplierSpeciality)
            let message = "Supplier Creation Failed"
            SubmissionFail(message);
        } else {

            // let supplier = {
            //     supplierName: this.state.supplierName,
            //     supplierCompany: this.state.supplierCompany,
            //     supplierSpeciality: this.state.supplierSpeciality,
            //     supplierPic: this.state.supplierPic
            // };

            // console.log("asdasd    "+this.state.supplier.supplierPic);

            axios.put(`http://localhost:8080/api/item/${this.props.match.params.id}`,this.state.supplier)
                .then(response => {
                    console.log('DATA TO SEND', this.state.supplier);
                    SubmissionAlert();

                })
                .catch(error => {
                    console.log(error.message);
                    SubmissionFail();
                })
        }
    }

    render() {
        const errors=this.validate(this.state.supplierName,this.state.supplierCompany,this.state.supplierSpeciality);

        return (
            <div className="workout_wrapper" style={{ borderTop: "10px solid black"}}>
                <br/><br/>
                <Form onSubmit={this.onSubmit}>
                    <h1 className="workout_title">ADD SUPPLIER</h1>
                    &nbsp;
                    <div className="row justify-content-md-center">
                        <FormGroup >
                            <Label for="workout_name">Name</Label>
                            <div>
                                <Input
                                    type="text"
                                    name="supplierName"
                                    id="supplierName"
                                    size="100"
                                    value={this.state.supplierName}
                                    onChange={this.onChange}
                                    valid={errors.supplierName === ''}
                                    invalid={errors.supplierName !== ''}
                                    onBlur={this.handleBlur('supplierName')}
                                />
                                <FormFeedback>{errors.supplierName}</FormFeedback>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="row justify-content-md-center">
                        <FormGroup >
                            <Label for="workout_theme">Company</Label>
                            <div>
                                <Input
                                    type="text"
                                    name="supplierCompany"
                                    id="supplierCompany"
                                    size="100"
                                    value={this.state.supplierCompany}
                                    onChange={this.onChange}
                                    valid={errors.supplierCompany === ''}
                                    invalid={errors.supplierCompany !== ''}
                                    onBlur={this.handleBlur('supplierCompany')}
                                />
                                <FormFeedback>{errors.supplierCompany}</FormFeedback>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="row justify-content-md-center">
                        <FormGroup >
                            <Label for="workout_description">Speciality</Label>
                            <div>
                                <Input
                                    type="text"
                                    name="supplierSpeciality"
                                    id="supplierSpeciality"
                                    size="160"
                                    value={this.state.supplierSpeciality}
                                    onChange={this.onChange}
                                    valid={errors.supplierSpeciality === ''}
                                    invalid={errors.supplierSpeciality !== ''}
                                    onBlur={this.handleBlur('supplierSpeciality')}
                                />
                                <FormFeedback>{errors.supplierSpeciality}</FormFeedback>
                            </div>
                        </FormGroup>
                    </div>

                    <div className="row justify-content-center">
                        <div>
                            {/*<FileBase type="file" multiple={false} onDone={({base64}) => this.state.supplierPic = base64} />*/}
                            <input type="file" onChange={this.handleChange} />

                        </div>
                    </div>

                    <button className="workout_button btn btn-primary">SUBMIT</button>
                </Form>

            </div>
        )
    }
}

export default EditCategoryAdmin;

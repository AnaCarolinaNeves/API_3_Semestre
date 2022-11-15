import axios from 'axios';
import React from 'react';
import { Component } from "react";
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import aviao from "../Icons/aviao.png";
import edit from "../Icons/editar.png"
import delet from "../Icons/excluir.png"
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";

type table = {
    id: string,
    nome: string,
    email: string,
    password: string,
    typeUser: string,
    createdAt: string,
    result: any[]
}

class UserTable extends Component<{}, table>{
    
    constructor(props: any) {
        super(props);
        this.state = {
            id: '',
            nome: '',
            email : '',
            password: '',
            typeUser: '',
            createdAt: '',
            result: []
        }
        
        this.onClickEdit = this.onClickEdit.bind(this)
        this.onClickDelete = this.onClickDelete.bind(this)
    }


    componentDidMount(): void {
        axios.get('http://localhost:3001/users').then(response => {
        let dadosBanco = response.data
        this.setState({
            result: dadosBanco
        })
        })
    }

    onClickEdit(event) {
        let id = event.target.id
        console.log(id);
    }

    onClickDelete(event) {
        let id = event.target.id
        console.log(id);
        Swal.fire({
            title: 'Delete  User',
            text: "This action cannot be reverted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                let deleted = await this.deleteAircraft(id)
                console.log(deleted)
                if(deleted){
                    Swal.fire(
                        'Deleted!',
                        'The aircraft has been deleted.',
                        'success'
                        )
                }else{
                    Swal.fire(
                        'Error!',
                        'An error has ocurred.',
                        'error'
                        )  
                }
                setTimeout(function() {
                    window.location.reload();
                  }, 3000);
            }
          })
    }

    public async deleteAircraft(id): Promise<boolean>  {
        let retorno = false
        await axios.delete('http://localhost:3001/users/deletar/' + id).then(response => {
            retorno = !response.data.erro
        })       
        return retorno
    }

    render() {
        return(
        <Container className='px-2 mb-5'>
            <Container>
                <Row className='px-2 mb-5 mt-5'>
                    <img src={aviao} alt="Avião." className='img col-sm-5 col-md-3 col-lg-2'/>
                    <h1 className='text-center mt-5 col-sm-7 col-md-9'>Registered User</h1>
                </Row>
                <Row className="pb-3">
                    <Col lg>
                        <Button className="btn-lg float-end" href='/registerUser'>New User</Button>
                    </Col>
                </Row>
            </Container>
            <Container>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th className='text-center'>Nome</th>
                    <th className='text-center'>Email</th>
                    <th className='text-center'>Password</th>
                    <th className='text-center'>Type of User</th>
                    <th className='text-center'>Action</th>
                </tr>
            </thead>
            <tbody>
                    {this.state.result.map(item => {
                        let date = new Date(item.createdAt);
                        let dateFormat = date.toLocaleDateString()
                        return(
                            <tr>
                                <td className='text-center'>{item.name}</td>
                                <td className='text-center'>{item.email}</td>
                                <td className='text-center'>{item.senha}</td>
                                <td className='text-center'>{item.tipoUsuario}</td>
                                <td className='text-center'>{dateFormat}</td>
                                <td className='text-center col-xs-1 col-sm-1 col-lg-2'>
                                    <Link to={"/editarUsuario/" + item.id}>
                                        <img src={edit} alt="Editar." id={item.id} className='img col-xs-1 col-sm-12 col-md-10 col-lg-4'/>
                                    </Link>
                                    <img src={delet} alt="Excluir." onClick={this.onClickDelete} id={item.id} className='img col-xs-2 col-sm-10 col-md-10 col-lg-4'/>
                                </td>
                            </tr>
                    )})}
            </tbody>

            </Table>
            </Container>
        </Container>
    )}        
}

export default UserTable;
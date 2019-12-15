import React ,{ Component} from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import axios from "axios";
import {Button, Modal} from "react-bootstrap";
import BeneficiarioForm from "../components/BeneficiarioForm";

class Beneficiarios extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          items: [],
          totalData: [],
          totalSize: 0,
          page: 1,
          sizePerPage: 10,
          showModalDetails: false,
          beneficiarios: null,
        };
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
        this.buttonFormatter = this.buttonFormatter.bind(this);
      }
    
      componentDidMount() {
        this.fetchData();
      }
    
      fetchData(page = this.state.page, sizePerPage = this.state.sizePerPage) {
        axios.get(`http://localhost:4000/api/beneficiarios?page_size=${sizePerPage}&page_num=${page}`).then(res => {  
            this.setState({
              items: res.data.data,
              totalSize: res.data.total, 
              page,
              sizePerPage
            });            
        });
      }
    
      handlePageChange(page, sizePerPage) {
        this.fetchData(page, sizePerPage);
      }
    
      handleSizePerPageChange(sizePerPage) {
        this.fetchData(1, sizePerPage);
      }

      showEdit = id => {
        if(id){
          axios.get(`http://localhost:4000/api/beneficiarios/${id}`).then(res => {
            this.setState({
              beneficiarios: res.data,
              showModalDetails: true,
            });
          });
        }else{
          this.setState({
            beneficiarios: null,
            showModalDetails: true,
          });
        }
      }

      buttonFormatter = (cell, row) => {
        return <Button variant="warning" onClick={()=> this.showEdit(row._id)}>Edit</Button>;
      }
    
    onSubmit = data => {
      const _data = {
        nombres: data.nombres,
        apellidos: data.apellidos,
        noCuenta: data.cuenta,
        email: data.email,        
        clienteId: '5debde6dced99e2384a084eb'
      };
      axios.post('http://localhost:4000/api/beneficiarios/add', _data)
              .then(res => {
                alert('Beneficiario agregado');
                this.setState({showModalDetails: false});
                this.fetchData();
              }).catch(err => {
                alert('Beneficiario agregado');
                this.setState({showModalDetails: false});
              });
      
    }
    
    render(){
        const options = {
            onPageChange: this.handlePageChange,
            onSizePerPageList: this.handleSizePerPageChange,
            page: this.state.page,
            sizePerPage: this.state.sizePerPage,
          };
        let beneForm = null;
        if(this.state.beneficiarios){
          console.log(this.state.beneficiarios);
          beneForm = <BeneficiarioForm {...{ show: this.state.showModalDetails,
            onHide: () => { this.setState({showModalDetails: false}); },
            onSubmit: this.onSubmit,
            edit: true}} beneficiario={this.state.beneficiarios}/>;
        }else{
          beneForm = <BeneficiarioForm {...{ show: this.state.showModalDetails,
            onHide: () => { this.setState({showModalDetails: false}); },
            onSubmit: this.onSubmit,
            edit: false}} beneficiario={null}/>;
        }

        return (
            <div>
                <h1>Beneficiarios <Button variant="primary" onClick={() => this.showEdit(0)}>nuevo</Button></h1>
                <BootstrapTable
                data={this.state.items}
                options={options}
                fetchInfo={{dataTotalSize: this.state.totalSize}}
                remote = {true}
                pagination = {true}
                striped
                hover
                condensed
                >
                    <TableHeaderColumn isKey dataField='_id'>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='nombres'>Nombres</TableHeaderColumn>
                    <TableHeaderColumn dataField='apellidos'>Apellidos</TableHeaderColumn>
                    <TableHeaderColumn dataField='noCuenta'>Cuenta</TableHeaderColumn>
                    <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter}>Buttons</TableHeaderColumn>
                </BootstrapTable>
                {beneForm}
            </div>
        );
    }
}


export default Beneficiarios;
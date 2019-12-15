import React ,{ Component} from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import axios from "axios";
import {Button, Modal} from "react-bootstrap";
import QueryDetails from "../components/QueryDetails";

class Query extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          items: [],
          totalData: [],
          totalSize: 0,
          page: 1,
          sizePerPage: 10,
          showModalDetails: false,
          transaction: null
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

      showTransactionDetail = id => {
        this.setState({
          showModalDetails: true
        });
        axios.get(`http://localhost:4000/api/beneficiarios/${id}`).then(res => {
          this.setState({
            transaction: res.data
          });
        });
      }

      buttonFormatter(cell, row){
        return <Button variant="info" onClick={()=> this.showTransactionDetail(row._id)}>Info</Button>;
      } 
    
    render(){
        const options = {
            onPageChange: this.handlePageChange,
            onSizePerPageList: this.handleSizePerPageChange,
            page: this.state.page,
            sizePerPage: this.state.sizePerPage,
          };
      

        return (
            <div>
                <h1>Transacciones</h1>
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
                    <TableHeaderColumn isKey dataField='_id'>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='nombres'>Nombre</TableHeaderColumn>
                    <TableHeaderColumn dataField='apellidos'>Apellido</TableHeaderColumn>
                    <TableHeaderColumn dataField='noCuenta'>Cuenta</TableHeaderColumn>
                    <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter}>Buttons</TableHeaderColumn>
                </BootstrapTable>

                <QueryDetails {...{...this.state.transaction, 
                                      show: this.state.showModalDetails,
                                      onHide: () => { this.setState({showModalDetails: false}); }}}/>
            </div>
        );
    }
}


export default Query;
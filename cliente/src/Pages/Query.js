import React ,{ Component} from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import axios from "axios";

class Query extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          items: [],
          totalData: [],
          totalSize: 0,
          page: 1,
          sizePerPage: 10,
        };
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
      }
    
      componentDidMount() {
        this.fetchData();
      }
    
      fetchData(page = this.state.page, sizePerPage = this.state.sizePerPage) {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {            
            let data = res.data.slice((page - 1) * sizePerPage, ((page - 1) * sizePerPage) + sizePerPage);
            this.setState({items: data, totalData: res.data, totalSize: 100, page, sizePerPage});            
        });
      }
    
      handlePageChange(page, sizePerPage) {
        this.fetchData(page, sizePerPage);
      }
    
      handleSizePerPageChange(sizePerPage) {
        this.fetchData(1, sizePerPage);
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
                <h1>Consultas</h1>
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
                    <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='title'>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='body'>Product Price</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}


export default Query;
import React, {Component} from 'react';
import Pagination from 'react-bootstrap/pagination'

class PaginationBar extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            todosPerPage: 10
        };
    }

    render() {
        const {todosPerPage} = this.state;
        const {todos} = this.props;
        const pageNumbers = [];
        let active = this.props.currentPage;
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(
                <Pagination.Item id={i} onClick={ ()=>this.props.handleCallback(i)} active={i === active} >
                    {i}
                </Pagination.Item>,
            );
        }

        return (
            <div className='col-md-8 m-4'>
                <Pagination>{pageNumbers}</Pagination>
            </div>
        );
    }
}

export default PaginationBar;

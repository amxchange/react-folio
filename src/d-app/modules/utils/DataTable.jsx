import React, { useEffect, useRef, useState } from "react";
import {
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    Table,
    Badge,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    UncontrolledTooltip,
    Collapse
} from "reactstrap";

const columnsMap = {};

const DataTable = props => {
    const { title = "", data = [], pagination = false, collapse = false, setCollapse = () => {} } = props;
    let { columns = [] } = props;
    if (typeof columns === "string" && columnsMap[columns]) {
        columns = columnsMap[columns];
    }

    return (
        <Card className="shadow">
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <Col xs="8">{title && <h3 className="mb-0">{title}</h3>}</Col>
                    <Col className="text-right" xs="4">
                        <Button color="primary" onClick={e => setCollapse(prev => !prev)} size="sm">
                            {collapse ? "Expand" : "Hide"}
                        </Button>
                    </Col>
                </Row>
            </CardHeader>
            <Collapse isOpen={!collapse}>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            {columns.map((col, index) => {
                                return (
                                    <th key={`table_col_${index}`} scope="col">
                                        {col.header}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => {
                            return (
                                <tr key={`table_row_${rowIndex}`}>
                                    {columns.map((col, colIndex) => {
                                        const content =
                                            col.cell && typeof col.cell === "function"
                                                ? col.cell(row)
                                                : row[col.accessor];
                                        return <td key={`table_row_col_${colIndex}`}>{content}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <CardFooter className="py-4">
                    {pagination && (
                        <nav aria-label="...">
                            <Pagination
                                className="pagination justify-content-end mb-0"
                                listClassName="justify-content-end mb-0"
                            >
                                <PaginationItem className="disabled">
                                    <PaginationLink href="#pablo" onClick={e => e.preventDefault()} tabIndex="-1">
                                        <i className="fas fa-angle-left" />
                                        <span className="sr-only">Previous</span>
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem className="active">
                                    <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                                        1
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                                        2 <span className="sr-only">(current)</span>
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                                        3
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                                        <i className="fas fa-angle-right" />
                                        <span className="sr-only">Next</span>
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </nav>
                    )}
                </CardFooter>
            </Collapse>
        </Card>
    );
};

export default DataTable;

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import {
  makeStyles, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination,
} from '@material-ui/core';
import trash from '../../../assets/img/trash.svg';
import AppLabel from '../../AppLabel';
// import Paper from '@material-ui/core/Paper';

function PaymentTable(props) {
  const { clientsData, rowClickedHandler } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const useStyles = makeStyles({ table: { minWidth: 650, color: '#787878' } });
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer className="table-container-styles">
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className="header-row-style">
              <TableCell>Nombre completo</TableCell>
              <TableCell align="center">Correo electrónico</TableCell>
              <TableCell align="center">Teléfono</TableCell>
              <TableCell align="center">Desde</TableCell>
              <TableCell align="center">Plan</TableCell>
              <TableCell align="right">Cobro </TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table-body-styles">
            {clientsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
              // eslint-disable-next-line react/no-array-index-key
                <TableRow key={i} onClick={() => rowClickedHandler(row)}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" align="center" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell component="th" align="center" scope="row">
                    <AppLabel label={row.contact} />
                  </TableCell>
                  <TableCell component="th" align="center" scope="row">
                    {row.affiliatedDate}
                  </TableCell>
                  <TableCell component="th" align="right" scope="row">
                    <div className="d-flex justify-content-center">
                      {row.activePlan === 'Monthly' ? (
                        <AppLabel label="MENSUAL" className="payment-card-item-name-pending payment-card-pending-div" />
                      ) : (
                        <AppLabel label="Annual" className="payment-card-item-name payment-card-pago-div" />
                      )}
                    </div>

                  </TableCell>
                  <TableCell align="right">{row.fee}</TableCell>
                  <TableCell align="right"><img src={trash} alt="." /></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={clientsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

PaymentTable.propTypes = {};

export default PaymentTable;

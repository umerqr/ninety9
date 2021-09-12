/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import {
  makeStyles, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination,
} from '@material-ui/core';
import discard from '../../../assets/img/discard.svg';
import visa from '../../../assets/img/visa.svg';
import mastercard from '../../../assets/img/mastercard.svg';
import AppLabel from '../../AppLabel';
// import Paper from '@material-ui/core/Paper';

function PaymentTable(props) {
  const { infoData } = props;
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
              <TableCell>Fecha</TableCell>
              <TableCell align="right">Plan</TableCell>
              <TableCell align="right">Método de pago</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="right">Descargar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table-body-styles">
            {infoData.cardsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell component="th" align="right" scope="row">
                    {row.plan}
                  </TableCell>
                  <TableCell className="d-flex" component="th" align="right" scope="row">
                    { row.visa ? <img className="inline-visa-styling" src={visa} alt="" />
                      : <img src={mastercard} className="inline-visa-styling" alt="" />}
                    <AppLabel label={row.payment} />
                  </TableCell>
                  <TableCell component="th" align="right" scope="row">
                    {row.amount}
                  </TableCell>
                  <TableCell component="th" align="right" scope="row">
                    <div className="d-flex justify-content-center">
                      {row.state === 'pending' ? (
                        <AppLabel label="PENDIENTE" className="payment-card-item-name-pending payment-card-pending-div" />
                      ) : (
                        <AppLabel label="PAGO" className="payment-card-item-name payment-card-pago-div" />
                      )}
                    </div>

                  </TableCell>
                  <TableCell align="right"><img src={discard} alt="." /></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={infoData.beneficiary.length}
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

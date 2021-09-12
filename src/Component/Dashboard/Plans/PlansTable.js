/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination,
} from '@material-ui/core';
import trash from '../../../assets/img/trash.svg';
// import Paper from '@material-ui/core/Paper';

function PlansTable(props) {
  const { infoData, handleDeleteBeneficiary } = props;
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
              <TableCell align="right">Agregado</TableCell>
              <TableCell align="right">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table-body-styles">
            {infoData.beneficiary
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.beneficiaryName}
                  </TableCell>
                  <TableCell component="th" align="right" scope="row">
                    {row.agregado}
                  </TableCell>
                  <TableCell align="right"><img onClick={() => handleDeleteBeneficiary(row)} src={trash} alt="." /></TableCell>
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
PlansTable.defaultProps = {
  handleDeleteBeneficiary: false,
  beneficiary: false,
  infoData: false,
};
PlansTable.propTypes = {
  handleDeleteBeneficiary: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  infoData: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  beneficiary: PropTypes.any,
};

export default PlansTable;

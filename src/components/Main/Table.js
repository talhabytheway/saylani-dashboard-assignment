import React, { useReducer, useState } from 'react';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@material-ui/icons';
import { reducer } from './reducer';
import {
  Grid,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  makeStyles,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
const user = [
  {
    value: 'adm',
    label: 'Admin',
  },
  {
    value: 'edi',
    label: 'Editor',
  },
  {
    value: 'mod',
    label: 'Moderator',
  },
  {
    value: 'view',
    label: 'Viewer',
  },
];

const columns = [
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 200 },
  {
    id: 'roles',
    label: 'Roles',
    minWidth: 120,
  },
  {
    id: 'perms',
    label: 'Extra Permissions',
    minWidth: 200,
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 130,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

let initPer = {
  name: '',
  email: '',
  roles: '',
  perms: '',
  id: '',
};

const initialState = {
  people: [],
  modalOpen: false,
  modalCotent: '',
  severity: '',
};
export default function StickyHeadTable() {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [eOpen, setEOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [person, setPerson] = useState(initPer);
  const [editPer, setEditPer] = useState(initPer);
  const [index, setIndex] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPerson(initPer);
  };
  const handleSubmit = () => {
    const { name, email, roles, perms } = person;
    if (name && email && roles && perms) {
      let id = new Date().getTime().toString();
      dispatch({
        type: 'ADD_ITEM',
        payload: { ...person, id },
        handleClose,
      });
    } else {
      dispatch({ type: 'EMPTY' });
    }
  };

  // edit fns

  const handleEClose = () => {
    setEOpen(false);
    setEditPer(initPer);
  };

  const handleEdit = (id) => {
    var indexx = state.people.findIndex((element) => element.id === id);
    setEditPer(state.people[indexx]);
    console.log(indexx, 'indexx');
    setEOpen(true);
    setIndex(indexx);
  };

  const onChangeE = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditPer({ ...editPer, [name]: value });
  };
  const handleEditE = () => {
    const { name, email, roles, perms } = editPer;
    if (name && email && roles && perms) {
      setEOpen(false);
      dispatch({
        type: 'EDIT',
        payload: { index, editPer },
      });
      handleEClose();
    } else {
      dispatch({ type: 'EMPTY' });
    }
  };
  let Buttons = ({ id }) => (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<EditIcon />}
        className={classes.button}
        onClick={() => handleEdit(id)}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={() => {
          dispatch({ type: 'DELETE', payload: id });
        }}
      >
        Delete
      </Button>
    </>
  );
  return (
    <>
      <Snackbar
        open={state.modalOpen}
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert severity={state.severity}>{state.modalCotent}</Alert>
      </Snackbar>
      <Grid container>
        <Grid item>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ margin: '.5rem' }}
              fullWidth={false}
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              Add
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add User</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="name"
                  id="name"
                  label="Name"
                  type="text"
                  value={person.name}
                  onChange={(e) => onChange(e)}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  name="email"
                  id="email"
                  label="Email"
                  type="email"
                  value={person.email}
                  onChange={(e) => onChange(e)}
                  fullWidth
                />
                <TextField
                  select
                  label="Roles"
                  name="roles"
                  id="roles"
                  value={person.roles}
                  onChange={(e) => onChange(e)}
                  helperText="Please Select a Role"
                >
                  {user.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  margin="dense"
                  name="perms"
                  id="perms"
                  label="Extra Permissions"
                  type="text"
                  value={person.perms}
                  onChange={(e) => onChange(e)}
                  helperText="Please list extra permissions (if any)"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Add User
                </Button>
              </DialogActions>
            </Dialog>

            {/* its for edit */}
            <Dialog
              open={eOpen}
              onClose={handleEClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="name"
                  id="name"
                  label="Name"
                  type="text"
                  value={editPer.name}
                  onChange={(e) => onChangeE(e)}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  name="email"
                  id="email"
                  label="Email"
                  type="email"
                  value={editPer.email}
                  onChange={(e) => onChangeE(e)}
                  fullWidth
                />
                <TextField
                  select
                  label="Roles"
                  name="roles"
                  id="roles"
                  value={editPer.roles}
                  onChange={(e) => onChangeE(e)}
                  helperText="Please Select a Role"
                >
                  {user.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  margin="dense"
                  name="perms"
                  id="perms"
                  label="Extra Permissions"
                  type="text"
                  value={editPer.perms}
                  onChange={(e) => onChangeE(e)}
                  helperText="Please list extra permissions (if any)"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleEditE} color="primary">
                  Edit User
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Grid>
        <Grid item sm={true}></Grid>
      </Grid>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {state.people
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {/* {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })} */}
                      <TableCell key="name" align="left">
                        {row.name}
                      </TableCell>
                      <TableCell key="email" align="left">
                        {row.email}
                      </TableCell>
                      <TableCell key="roles" align="left">
                        {row.roles}
                      </TableCell>
                      <TableCell key="perms" align="left">
                        {row.perms}
                      </TableCell>
                      <TableCell key="actions" align="center">
                        <Buttons id={row.id} />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={state.people.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

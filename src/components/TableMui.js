import React, { useCallback, useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { RiDeleteBin4Fill } from "react-icons/ri";
import {AiFillEdit} from "react-icons/ai"


const TableMui = () => {
  const username =  window.localStorage.getItem("username")
    let [marks, setMarks] = useState([])
    let result = ['Alaska11', 'Student_new', 'TOP_USER228']

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch(`http://127.0.0.1:5000/marks/${username}`, {
            method: 'GET',
          });
          const data = await response.json();
          setMarks(data);
          
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, []);
    
    
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
 
  const handleCreateNewRow = (values) => {
    marks.push(values);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      marks[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      exitEditingMode(); 
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  //const handleDeleteRow = useCallback(
  //  (row) => {
   //   if (
   /////    !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
    //  ) {
    //    return;
   //   }
      //send api delete request here, then refetch or update local table data for re-render
    //  tableData.splice(row.index, 1);
    //  setTableData([...tableData]);
   // },
   // [tableData],
 // );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
              cell.column.id === 'Value'
              ? validateValue(event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is not valid`,
            });
          } else {
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'MarkId',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, 
        size: 50,
      },
      {
        accessorKey: 'StudentId',
        header: 'Student ID',
        muiTableBodyCellEditTextFieldProps: {
          select: true,
          children: (
            <>
              {result.map((user) => (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              ))}
            </>
          ),
        },
      },
      {
        accessorKey: 'SubjectId',
        header: 'Subject',
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'Value',
        header: 'Mark',
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'DateId',
        header: 'Date',
        size: 50,
        
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'date',
        }),
      },
    ],
    [getCommonEditTextFieldProps],
  );

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 50,
          },
        }}
        columns={columns}
        data={marks}
        editingMode="modal" 
        muiTablePaginationProps={{
          rowsPerPageOptions: [5, 10, 15],
          showFirstButton: false,
          showLastButton: false,
        }}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableColumnOrdering
        enableEditing
        enableStickyHeader
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        muiTableHeadCellProps={{
        sx: {
          background:"rgba(41, 124, 219, 0.575)"
        },
      }}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <span>
                <AiFillEdit size={25} onMouseOver={({target})=>target.style.color="grey"}
                                          onMouseOut={({target})=>target.style.color="black"}
                                          onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </AiFillEdit>
              </span>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <span>
                <RiDeleteBin4Fill color="rgba(239, 64, 64, 0.875)" size={22} 
                onMouseOver={({target})=>target.style.color="rgba(124, 3, 3, 0.875)"}
                onMouseOut={({target})=>target.style.color="rgba(239, 64, 64, 0.875)"}>
                  <Delete />
                </RiDeleteBin4Fill>
              </span>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          
          <Button
            onMouseOver={({target})=>target.style.background="#555"}
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
            sx={
          {
            background: '#555',
            borderRadius: "10rem", 
           }
        }
          >
          Add Grade
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
/>
    </>
  );
};

export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      if (column.accessorKey === "Value" || column.accessorKey === "DateId" || column.accessorKey === "StudentId") {
        acc[column.accessorKey] = '';
      }
      return acc;
    }, {}),
  );

  const username =  window.localStorage.getItem("username")
  const password =  window.localStorage.getItem("password")
  let [marks, setMarks] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/marks/${username}`, {
          method: 'GET',
        });
        const data = await response.json();
        setMarks(data);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const subject = marks.length > 0 ? marks[0].SubjectId : null;

  const handleSubmit = () => {
    console.log(values);
  
    const data_sbmt = {
      StudentId: values.StudentId,
      SubjectId: subject,
      TeacherId: username,
      DateId: values.DateId,
      Value: Number(values.Value),
    };
  
    fetch('http://127.0.0.1:5000/teacher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      },
      body: JSON.stringify(data_sbmt),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
       
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  
    onClose();
  };
  
  
  let result = ['Alaska11', 'Student_new', 'TOP_USER228']


  
  return (
    <Dialog open={open}>
    <DialogContent>
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack
          sx={{
            width: '50%',
            minWidth: { xs: '300px', sm: '360px', md: '400px' },
            gap: '1.5rem',
          }}
        >
          {columns
            .filter((column) => ['Value', 'DateId', 'StudentId'].includes(column.accessorKey))
            .map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                type={column.accessorKey === 'DateId' ? 'date' : 'text'}
                InputLabelProps={
                  column.accessorKey === 'DateId' ? { shrink: true } : {}
                }
                select={column.accessorKey === 'StudentId'}
              >
                {column.accessorKey === 'StudentId' &&
                result.map((user) => (
                    <MenuItem key={user} value={user}>
                      {user}
                    </MenuItem>
                  ))}
              </TextField>
            ))}
        </Stack>
      </form>
    </DialogContent>
    <DialogActions sx={{ p: '1.25rem' }}>
      <Button
        onClick={onClose}
        variant='outlined'
        sx={{ borderRadius: '10rem' }}
      >
        Cancel
      </Button>
      <Button
        color='success'
        onClick={handleSubmit}
        variant='contained'
        sx={{ borderRadius: '10rem' }}
      >
        Submit
      </Button>
    </DialogActions>
  </Dialog>
  
  );
};

const validateRequired = (value) => !!value.length;
const validateValue = (value) => value >= 0

export default TableMui;

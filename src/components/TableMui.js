import React, { useCallback, useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
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
import { data } from './Data.js';
import { RiDeleteBin4Fill } from "react-icons/ri";
import {AiFillEdit} from "react-icons/ai"


const TableMui = () => {
  const username = localStorage.getItem("username")
  const password = localStorage.getItem("password")
    let [records, setRecords] = useState([]);
    let result = []
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch(`http://127.0.0.1:5000/students`, {
            method: 'GET',
            headers: {
              'Authorization': 'Basic ' + btoa(username + ':' + password)
            }
          });
          const data = await response.json();
          setRecords(data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, []);
    
    useEffect(() => {
      result = records.map((obj) => obj.StudentId);

    }, [records]);
    
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
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
          children: result.map((user) => (
            <MenuItem key={user} value={user}>
              {user}
            </MenuItem>
          )),
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
        data={tableData}
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
              <AiFillEdit size={25} onMouseOver={({target})=>target.style.color="grey"}
                                    onMouseOut={({target})=>target.style.color="black"}
                                    onClick={() => table.setEditingRow(row)}>
                <Edit />
              </AiFillEdit>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <RiDeleteBin4Fill color="rgba(239, 64, 64, 0.875)" size={22} 
              onMouseOver={({target})=>target.style.color="rgba(124, 3, 3, 0.875)"}
              onMouseOut={({target})=>target.style.color="rgba(239, 64, 64, 0.875)"}>
                <Delete />
              </RiDeleteBin4Fill>
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

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {}),
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

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
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose} variant='outlined'
        sx={{ borderRadius: "10rem",}}  
        >Cancel</Button>
        <Button color="success" onClick={handleSubmit} variant="contained"
        sx={{ borderRadius: "10rem",}}  >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateValue = (value) => value >= 0

export default TableMui;

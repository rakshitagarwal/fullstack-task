import { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import theme from "../../utils/theme";
import EditRow from "../modals/EditRow";
import { useDispatch, useSelector } from "react-redux";
import { updateData, deleteData } from "../../redux/excelSlice";

const FileTable = ({ colDefs, rowsData,  tableName, datatypeName }) => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.excel);
  const [isEditPopup, setEditPopup] = useState(false);
  const [editData, setEditData] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  const openEditModal = ( row, index) => {
    setEditPopup(true);
    setEditData(row);
    setEditIndex(index);
  };

  const closeEditModal = () => {
    setEditPopup(false);
  };

  const handleEditClick = (toEdit) => {
    // console.log('update data', toEdit);
    dispatch(updateData({index: editIndex,  tableName, datatypeName , value: toEdit}));
  };

  const handleDeleteClick = (toDelete) => {
    dispatch(deleteData(toDelete));
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {colDefs &&
                colDefs.map((colDef) => (
                  <TableCell key={colDef.field}>{colDef.title}</TableCell>
                ))}
              {colDefs && <TableCell>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData &&
              rowsData.map((row, index) => (
                <TableRow key={index}>
                  {colDefs &&
                    colDefs.map((colDef, index) => (
                      <TableCell key={colDef.field}>
                        {row[colDef.field]}
                      </TableCell>
                    ))}
                  <TableCell style={{ width: "100px" }}>
                    {Object.keys(row).length !== 0 && (
                      <>
                        <IconButton
                          aria-label="edit"
                          onClick={() => openEditModal(row, index)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteClick({ row, index, tableName, datatypeName })}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
    {isEditPopup && (
        <EditRow
          isOpen={isEditPopup}
          onClose={closeEditModal}
          onInputSubmit={handleEditClick}
          values={editData}
        />
      )}
    </>
  );
};

export default FileTable;

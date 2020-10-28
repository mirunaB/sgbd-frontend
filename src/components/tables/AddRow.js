import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addRow, getColumns } from "../../store/TableActions";
import styled from "styled-components";

const StyledInput = styled(TextField)`
  margin-top: 20px;
`;

const Wrapper = styled(Paper)`
  margin-top: ${({ theme }) => theme.spacing(8)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)}px;
`;

const AddRow = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const dispatch = useDispatch();
  const cols = useSelector((state) => state.tableReducers.cols);

  const [state, setState] = useState({});

  useEffect(() => {
    dispatch(getColumns(query.db, query.table));
  }, []);

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  const submitRow = () => {
    dispatch(addRow(query.db, query.table, state));
  };

  return (
    <Container>
      <Wrapper>
        <Typography
          variant="h5"
          style={{ alignSelf: "flex-start", marginBottom: "20px" }}
        >
          Add new row for {query.table}
        </Typography>
        {cols &&
          cols.length > 0 &&
          cols.map((col) => (
            <FormControl fullWidth margin="dense">
              <InputLabel shrink htmlFor="col-input">
                {col.toUpperCase()}:
              </InputLabel>
              <StyledInput
                variant="outlined"
                id="col-input"
                onChange={(e) => handleChange(e, col)}
              />
            </FormControl>
          ))}
        <Button
          variant="contained"
          color="primary"
          onClick={submitRow}
          style={{
            alignSelf: "flex-start",
            marginTop: "10px",
          }}
        >
          Add Row
        </Button>
      </Wrapper>
    </Container>
  );
};

export default AddRow;

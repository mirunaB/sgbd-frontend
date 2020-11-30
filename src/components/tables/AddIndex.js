import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { addIndex, getColumns } from "../../store/TableActions";

const Form = styled.form`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`;

const Wrapper = styled(Paper)`
  margin-top: ${({ theme }) => theme.spacing(8)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)}px;
`;

const FormControlStyled = styled(FormControl)`
  width: 100%;
`;

const StyledGridCol = styled(Grid)`
  padding: 8px;
  & > div {
    background: #fff;
  }
`;

const AddIndex = () => {
  const [errors, setErrors] = useState(null);
  const [columns, setColumns] = useState([]);

  console.log("COLUMSN ", columns);

  const dispatch = useDispatch();
  const tableCols = useSelector((state) => state.tableReducers.cols || []);

  const [formData, setFormData] = useState({
    name: "",
    isUnique: false,
  });
  const location = useLocation();
  const query = queryString.parse(location.search);

  const { name } = formData;

  const addColumn = () => {
    console.log("db name ", query.db, " table ", query.table);
    dispatch(getColumns(query.db, query.table));
    setColumns([
      ...columns,
      {
        id: `col-${columns.length}`,
        columnsIndex: {},
      },
    ]);
  };

  const handleColumnChange = (e, index, name) => {
    const cols = columns.map((col) => {
      if (col.id === `col-${index}`) {
        return {
          ...col,
          [name]: e.target.value,
        };
      }
      return col;
    });
    setColumns(cols);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Name is required");
      setErrors({ name: true });
    } else {
      dispatch(addIndex(query.db, query.table, { ...formData, columns }));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Wrapper>
        <Typography component="h1" variant="h5">
          Add a new index
        </Typography>
        <Form noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <StyledGridCol item md={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                value={formData.name}
                id="name"
                label="Index name"
                name="name"
              />
            </StyledGridCol>
            <StyledGridCol item md={12} sm={6}>
              <FormControlStyled>
                <InputLabel id="demo-simple-select-label">Is unique</InputLabel>
                <Select
                  labelId="isUnique"
                  id="isUnique"
                  value={formData.isUnique}
                  onChange={(e) =>
                    setFormData({ ...formData, isUnique: e.target.value })
                  }
                >
                  <MenuItem value="true">true</MenuItem>
                  <MenuItem value="false">false</MenuItem>
                </Select>
              </FormControlStyled>
            </StyledGridCol>
            <StyledGridCol item md={12} sm={6}>
              <Grid
                container
                spacing={2}
                style={{
                  padding: "8px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                {columns.length > 0 &&
                  columns.map((col, index) => (
                    <Grid
                      container
                      style={{
                        width: "100%",
                        display: "flex",
                        background: "#f1f1f1",
                        padding: "8px",
                        margin: "-8px",
                        marginBottom: "20px",
                      }}
                      key={`col-${index}`}
                    >
                      <StyledGridCol item md={12} sm={6}>
                        <FormControlStyled>
                          <InputLabel id="demo-simple-select-label">
                            Attribute name
                          </InputLabel>
                          <Select
                            labelId="columnsIndex"
                            id="columnsIndex"
                            onChange={(e) =>
                              handleColumnChange(e, index, "columnsIndex")
                            }
                            value={columns[index].columnsIndex}
                          >
                            {tableCols &&
                              Object.keys(tableCols).length > 0 &&
                              Object.keys(tableCols).map((key) => (
                                <MenuItem value={tableCols[key]}>
                                  {tableCols[key]}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControlStyled>
                      </StyledGridCol>
                    </Grid>
                  ))}
              </Grid>
            </StyledGridCol>
            <Grid item xs={12} sm={12}>
              <Button
                color="primary"
                variant="outlined"
                onClick={addColumn}
                disabled={formData.tableName === ""}
              >
                Add Column
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default AddIndex;

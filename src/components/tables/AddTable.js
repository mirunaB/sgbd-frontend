import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Button, Paper } from "@material-ui/core";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { addTable, getTablesFk } from "../../store/TableActions";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

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

const AddTable = () => {
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const [age, setAge] = React.useState("");
  const [columns, setColumns] = useState([]);
  const location = useLocation();
  const values = queryString.parse(location.search);
  const tablesFk = useSelector((state) => state.tableReducers.tablesFk || []);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [formData, setFormData] = useState({
    dbName: values && values.name ? values.name : "",
    tableName: "",
  });

  const { dbName, tableName } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (dbName === "") {
      toast.error("Database  is required");
      setErrors({ name: true });
    } else if (tableName === "") {
      toast.error("Name is required");
      setErrors({ name: true });
    } else {
      dispatch(addTable(formData.dbName, formData.tableName, columns));
    }
  };

  const addColumn = () => {
    if (formData.tableName === "") return;
    dispatch(getTablesFk(dbName, formData.tableName));
    setColumns([
      ...columns,
      {
        id: `col-${columns.length}`,
        attributeName: "",
        type: "",
        length: 0,
        isNull: false,
        isPrimaryKey: false,
        isUniqueKey: false,
        hasIndex: false,
        indexName: "",
        keyLength: 0,
        isUnique: false,
        indexType: "",
        fk: {},
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

  console.log(columns);

  return (
    <Container component="main" maxWidth="lg">
      <Wrapper>
        <Typography component="h1" variant="h5">
          Add a new table
        </Typography>
        <Form noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, dbName: e.target.value })
                }
                value={formData.dbName}
                id="dbName"
                label="Database name"
                name="dbName"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, tableName: e.target.value })
                }
                value={formData.tableName}
                id="tableName"
                label="Table name"
                name="tableName"
              />
            </Grid>
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
                    <StyledGridCol item md={2} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={(e) =>
                          handleColumnChange(e, index, "attributeName")
                        }
                        value={columns[index].name}
                        id="attributeName"
                        label="Column name"
                        name="attributeName"
                      />
                    </StyledGridCol>
                    <StyledGridCol item md={2} sm={6}>
                      <FormControlStyled>
                        <InputLabel id="demo-simple-select-label">
                          Type
                        </InputLabel>
                        <Select
                          labelId="columnType"
                          id="columnType"
                          onChange={(e) => handleColumnChange(e, index, "type")}
                          value={columns[index].type}
                        >
                          <MenuItem value="String">String</MenuItem>
                          <MenuItem value="Integer">Integer</MenuItem>
                          <MenuItem value="Boolean">Boolean</MenuItem>
                        </Select>
                      </FormControlStyled>
                    </StyledGridCol>
                    <StyledGridCol item md={2} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={(e) => handleColumnChange(e, index, "length")}
                        value={columns[index].name}
                        id="length"
                        label="Length"
                        name="length"
                      />
                    </StyledGridCol>
                    <StyledGridCol item md={2} sm={6}>
                      <FormControlStyled>
                        <InputLabel id="demo-simple-select-label">
                          Is null
                        </InputLabel>
                        <Select
                          labelId="isNull"
                          id="isNull"
                          onChange={(e) =>
                            handleColumnChange(e, index, "isNull")
                          }
                          value={columns[index].isNull}
                        >
                          <MenuItem value="true">true</MenuItem>
                          <MenuItem value="false">false</MenuItem>
                        </Select>
                      </FormControlStyled>
                    </StyledGridCol>
                    <StyledGridCol item md={2} sm={6}>
                      <FormControlStyled>
                        <InputLabel id="demo-simple-select-label">
                          Is primary key
                        </InputLabel>
                        <Select
                          labelId="isPrimaryKey"
                          id="isPrimaryKey"
                          onChange={(e) =>
                            handleColumnChange(e, index, "isPrimaryKey")
                          }
                          value={columns[index].isPrimaryKey}
                        >
                          <MenuItem value="true">true</MenuItem>
                          <MenuItem value="false">false</MenuItem>
                        </Select>
                      </FormControlStyled>
                    </StyledGridCol>
                    <StyledGridCol item md={2} sm={6} xs={12}>
                      <FormControlStyled>
                        <InputLabel id="demo-simple-select-label">
                          Is unique key
                        </InputLabel>
                        <Select
                          labelId="isUniqueKey"
                          id="isUniqueKey"
                          onChange={(e) =>
                            handleColumnChange(e, index, "isUniqueKey")
                          }
                          value={columns[index].isUniqueKey}
                        >
                          <MenuItem value="true">true</MenuItem>
                          <MenuItem value="false">false</MenuItem>
                        </Select>
                      </FormControlStyled>
                    </StyledGridCol>
                    <StyledGridCol>
                      <p>
                        <Typography>Foreign key for table</Typography>
                      </p>
                    </StyledGridCol>
                    <StyledGridCol>
                      <FormControlStyled>
                        <InputLabel id="demo-simple-select-label">
                          Table
                        </InputLabel>
                        <Select
                          labelId="fk"
                          id="fk"
                          onChange={(e) => handleColumnChange(e, index, "fk")}
                          value={columns[index].fk}
                        >
                          {tablesFk &&
                            Object.keys(tablesFk).length > 0 &&
                            Object.keys(tablesFk).map((key) => (
                              <MenuItem
                                value={`${key},${tablesFk[key]}`}
                              >{`${key},${tablesFk[key]}`}</MenuItem>
                            ))}
                        </Select>
                      </FormControlStyled>
                    </StyledGridCol>
                    {/* {columns[index].hasIndex && (
                      <StyledGridCol item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          onChange={(e) =>
                            handleColumnChange(e, index, "indexName")
                          }
                          value={columns[index].name}
                          id="indexName"
                          label="Index name"
                          name="indexName"
                        />
                      </StyledGridCol>
                    )}
                    // {columns[index].hasIndex && ( 
                    //   <StyledGridCol item xs={12} sm={6}>
                    //     <TextField
                    //       variant="outlined"
                    //       required
                    //       fullWidth
                    //       onChange={(e) =>
                    //         handleColumnChange(e, index, "indexType")
                    //       }
                    //       value={columns[index].name}
                    //       id="indexType"
                    //       label="Index type"
                    //       name="indexType"
                    //     />
                    //   </StyledGridCol>
                    // )} */}
                  </Grid>
                ))}
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

export default AddTable;

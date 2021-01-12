import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Button, InputLabel, MenuItem, Paper, Select } from "@material-ui/core";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormControl from "@material-ui/core/FormControl";
import { getTablesFk } from "../../store/TableActions";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { selectJoin } from "../../store/DbActions";

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

const SelectJoin = () => {
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const values = queryString.parse(location.search);
  let records = useSelector((state) => state.dbReducers.recordsJoin || []);
  console.log(records);

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
    } else {
      dispatch(
        selectJoin(
          formData.type,
          formData.dbName,
          formData.table1,
          formData.table2,
          formData.cols,
          formData.condition,
          formData.selectedColumns
        )
      );
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <FormControl
        style={{
          marginTop: "50px",
          minWidth: "200px",
        }}
      >
        <InputLabel id="selectType">Join type</InputLabel>
        <Select
          labelId="selectType"
          id="demo-simple-select"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <MenuItem value="leftInnerJoin">Left Join</MenuItem>
          <MenuItem value="innerJoin">Inner Join</MenuItem>
          <MenuItem value="rightInnerJoin">Right Join</MenuItem>
        </Select>
      </FormControl>
      <Wrapper>
        <Form noValidate onSubmit={onSubmit}>
          <Typography component="h1" variant="h5">
            USING
          </Typography>
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
          <Typography component="h1" variant="h5">
            SELECT
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, selectedColumns: e.target.value })
                }
                value={formData.selectedColumns}
                id="selectedColumns"
                label="columns"
                name="Columns"
              />
            </Grid>
            <Typography component="h1" variant="h5">
              FROM
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) =>
                    setFormData({ ...formData, table1: e.target.value })
                  }
                  value={formData.table1}
                  id="table1"
                  label="From Table"
                  name="table1"
                />
              </Grid>
            </Grid>
            <Typography component="h1" variant="h5">
              INNER JOIN
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) =>
                    setFormData({ ...formData, table2: e.target.value })
                  }
                  value={formData.table2}
                  id="table2"
                  label="Inner Join"
                  name="table2"
                />
              </Grid>
            </Grid>
            <Typography component="h1" variant="h5">
              ON
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) =>
                    setFormData({ ...formData, cols: e.target.value })
                  }
                  value={formData.cols}
                  id="cols"
                  label="On"
                  name="cols"
                />
              </Grid>
            </Grid>
            <Typography component="h1" variant="h5">
              WHERE
            </Typography>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                value={formData.condition}
                id="condition"
                label="Condition"
                name="condition"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button type="submit" variant="contained" color="primary">
                Run query
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Wrapper>
      <ul>
        {records.data != undefined &&
          records.data.map((item) => {
            return <li>{item}</li>;
          })}
      </ul>
    </Container>
  );
};

export default SelectJoin;

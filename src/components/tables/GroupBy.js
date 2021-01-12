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
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { groupBy, selectJoin } from "../../store/DbActions";

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

const GroupBy = () => {
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const values = queryString.parse(location.search);
  let records = useSelector((state) => state.dbReducers.groupByResult || {});

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
      dispatch(groupBy(formData.dbName, formData.tableName, formData.column));
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Wrapper>
        <Form noValidate onSubmit={onSubmit}>
          <Typography component="h1" variant="h5">
            DATABASE
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
            TABLE NAME
          </Typography>
          <Grid container spacing={2}>
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
                label="Table Name"
                name="tableName"
              />
            </Grid>
            <Typography component="h1" variant="h5">
              COLUMN
            </Typography>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, column: e.target.value })
                }
                value={formData.column}
                id="column"
                label="Column"
                name="column"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Wrapper>
      <ul>
        {records.data != undefined &&
          Object.keys(records.data).map((key) => (
            <li>{`${key} -- ${records.data[key]}`}</li>
          ))}
      </ul>
    </Container>
  );
};

export default GroupBy;

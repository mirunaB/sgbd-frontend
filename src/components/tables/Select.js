import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Button, Paper } from "@material-ui/core";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormControl from "@material-ui/core/FormControl";
import { getTablesFk, select } from "../../store/TableActions";
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

const AddTable = () => {
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const values = queryString.parse(location.search);
  let records = useSelector((state) => state.dbReducers.records || []);
  console.log(records.data);

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
      dispatch(
        select(
          formData.dbName,
          formData.columns,
          formData.tableName,
          formData.condition
        )
      );
    }
  };

  return (
    <Container component="main" maxWidth="lg">
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
                  setFormData({ ...formData, columns: e.target.value })
                }
                value={formData.columns}
                id="columns"
                label="Columns"
                name="columns"
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
                    setFormData({ ...formData, tableName: e.target.value })
                  }
                  value={formData.tableName}
                  id="table"
                  label="Table"
                  name="table"
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
                  // required
                  fullWidth
                  // onChange={(e) =>
                  //   setFormData({ ...formData, tableName: e.target.value })
                  // }
                  // value={formData.tableName}
                  // id="table"
                  label="innerJoin"
                  name="innerJoin"
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
                  // required
                  fullWidth
                  // onChange={(e) =>
                  //   setFormData({ ...formData, tableName: e.target.value })
                  // }
                  // value={formData.tableName}
                  // id="table"
                  label="on"
                  name="on"
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

export default AddTable;

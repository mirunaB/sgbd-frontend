import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Button, Paper } from "@material-ui/core";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { dropTable } from "../../store/TableActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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

const DropTable = () => {
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    dbName: "",
    dbTable: "",
  });
  const { dbName, dbTable } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (dbName === "") {
      toast.error("Database is required");
      setErrors({ name: true });
    } else if (dbTable === "") {
      toast.error("Name is required");
      setErrors({ name: true });
    } else {
      dispatch(dropTable(formData.dbName, formData.dbTable));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Wrapper>
        <Typography component="h1" variant="h5">
          Drop an existing table
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
                  setFormData({ ...formData, dbTable: e.target.value })
                }
                value={formData.dbTable}
                id="dbTable"
                label="Table name"
                name="dbTable"
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
    </Container>
  );
};

export default DropTable;

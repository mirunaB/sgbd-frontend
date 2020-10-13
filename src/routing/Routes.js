import React from "react";
import { Route, Switch } from "react-router-dom";
import AddDatabase from "../components/databases/AddDatabase";
import DropDatabase from "../components/databases/DropDatabase";
import DropTable from "../components/tables/DropTable";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/addDb" component={AddDatabase} />
        <Route exact path="/dropDb" component={DropDatabase} />
        <Route exact path="/dropTable" component={DropTable} />
      </Switch>
    </div>
  );
};

export default Routes;

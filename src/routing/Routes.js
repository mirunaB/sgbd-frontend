import React from "react";
import { Route, Switch } from "react-router-dom";
import AddDatabase from "../components/databases/AddDatabase";
import DropDatabase from "../components/databases/DropDatabase";
import DropTable from "../components/tables/DropTable";
import AddTable from "../components/tables/AddTable";
import ShowDb from "../components/databases/ShowDb";
import ShowTables from "../components/databases/ShowTables";
import AddRow from "../components/tables/AddRow";
import Select from "../components/tables/Select";
import AddIndex from "../components/tables/AddIndex";
import SelectJoin from "../components/tables/SelectJoin";
import GroupBy from "../components/tables/GroupBy";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ShowDb} />
        <Route exact path="/addDb" component={AddDatabase} />
        <Route exact path="/dropDb" component={DropDatabase} />
        <Route exact path="/dropTable" component={DropTable} />
        <Route exact path="/addTable" component={AddTable} />
        <Route exact path="/getDbs" component={ShowDb} />
        <Route exact path="/getTables" component={ShowTables} />
        <Route exact path="/addRow" component={AddRow} />
        <Route exact path="/select" component={Select} />
        <Route exact path="/selectJoin" component={SelectJoin} />
        <Route exact path="/groupBy" component={GroupBy} />
        <Route exact path="/addIndex" component={AddIndex} />
      </Switch>
    </div>
  );
};

export default Routes;

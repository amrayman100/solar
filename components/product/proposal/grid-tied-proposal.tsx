import { GridTiedProposal } from "@/models/product";

export function ViewGridTiedProposal(gridTiedProposal: GridTiedProposal) {
  const details = gridTiedProposal.proposalDetails;

  return (
    <div>
      <h3>System Size: {details.systemSize}</h3>
      <h3>Cost of Panels: {details.costOfPanels}</h3>
      <h3>Invertor Costs:</h3>
      <ul>
        {Object.entries(details.invertorCosts).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      <h3>Labour Cost: {details.labourCost}</h3>
      <h3>Concrete Footing Cost: {details.concreteFootingCost}</h3>
      <h3>DC Cable Cost: {details.dcCableCost}</h3>
      <h3>DC Earth Cable Cost: {details.dcEarthCableCost}</h3>
      <h3>Earth Cost: {details.earthCost}</h3>
      <h3>Fuse Cost: {details.fuseCost}</h3>
      <h3>MC4 Cost: {details.mc4Cost}</h3>
      <h3>Switch Box Cost: {details.switchBoxCost}</h3>
      <h3>Earth Leakage Cost: {details.earthLeakageCost}</h3>
      <h3>Cleaning Tool Price: {details.cleaningToolPrice}</h3>
      <h3>Electricity Company Cost: {details.electricityCompanyCost}</h3>
      <h3>Maintenance Cost: {details.maintenanceCost}</h3>
      <h3>Mounting Structure Cost: {details.mountingStructureCost}</h3>
      <h3>Transportation Cost: {details.transportationCost}</h3>
      <h3>Total Cost: {details.totalCost}</h3>
      <h3>Selling Cost: {details.sellingCost}</h3>
      <h3>First Year Savings: {details.firstYearSavings}</h3>
      <h3>Twenty Fifth Year Savings: {details.twentyFifthYearSavings}</h3>
    </div>
  );
}

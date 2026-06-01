import DashboardLayout from "../../components/layout/DashboardLayout";
import AircraftUtilization from "../../components/reports/AircraftUtilization";

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <AircraftUtilization />
    </DashboardLayout>
  );
}

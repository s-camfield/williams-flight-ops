import DashboardLayout from "../../components/layout/DashboardLayout";
import HoldForm from "../../components/events/HoldForm";

export default function MaintenancePage() {
  return (
    <DashboardLayout>
      <HoldForm type="Maintenance" />
    </DashboardLayout>
  );
}

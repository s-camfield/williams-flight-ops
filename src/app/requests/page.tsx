import DashboardLayout from "../../components/layout/DashboardLayout";
import RequestInbox from "../../components/requests/RequestInbox";

export default function RequestsPage() {
  return (
    <DashboardLayout>
      <RequestInbox />
    </DashboardLayout>
  );
}

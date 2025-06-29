import { Suspense } from "react";
import CustomPlan from "./_components/CustomPlan";

export default function PlanUsersPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading plan...</div>}>
        <CustomPlan />
      </Suspense>
    </div>
  );
}
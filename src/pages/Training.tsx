import React from "react";
import { PlanningSection } from "../components/PlanningSection";
import { TrainingSection } from "../components/TrainingSection";
import { selectStatus } from "../redux/planning/selectors";
import { useAppSelector } from "../hooks";
import { planningStatuses } from "../constants/";

const Training: React.FC = () => {
  const status = useAppSelector(selectStatus) ?? "";
  const isShowTraining = (Object.values(planningStatuses) as string[]).includes(
    status
  );

  return isShowTraining ? <TrainingSection /> : <PlanningSection />;
};

export default Training;

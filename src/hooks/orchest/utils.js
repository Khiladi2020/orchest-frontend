import type { IOrchestSession, IOrchestState } from "@/types";

const getSessionValue = (session) => {
  return (
    session && {
      projectUuid: session.projectUuid || session.project_uuid,
      pipelineUuid: session.pipelineUuid || session.pipeline_uuid,
    }
  );
};

// because project_uuid and pipeline_uuid can either be snake_case or camelCase,
// isSession function should be able to compare either case.
export const isSession = (a, b) => {
  if (!a || !b) return false;
  const sessionA = getSessionValue(a);
  const sessionB = getSessionValue(b);

  return !Object.keys(sessionA).some((key) => sessionA[key] !== sessionB[key]);
};

export const isCurrentSession = (
  session ,
  state
) => isSession(session, state);

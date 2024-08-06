import { applicableMeasureRouter } from "./router/applicableMeasure";
import { assessmentRouter } from "./router/assessment";
import { assessmentTypeRouter } from "./router/assessmentType";
import { authRouter } from "./router/auth";
import { patientRouter } from "./router/patient";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  assessment: assessmentRouter,
  assessmentType: assessmentTypeRouter,
  patient: patientRouter,
  applicableMeasure: applicableMeasureRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

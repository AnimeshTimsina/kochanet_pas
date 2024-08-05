import { z } from "zod";

import { protectedProcedure } from "../trpc";

export const assessmentRouter = {
  all: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;
    const assessments = await db.assessment.findMany({
      where: {
        uid: session.user.id,
      },
    });
    return assessments;
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const assessment = await db.assessment.findFirst({
        where: {
          id: input.id,
          uid: session.user.id,
        },
        include: {
          applicableMeasure: {
            include: {
              Question: {
                include: {
                  QuestionOption: {
                    include: {
                      AssessmentAnswer: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return assessment;
    }),
  typesAndMeasures: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const types = await db.assessmentType.findMany({
      include: {
        ApplicableMeasure: true,
      },
    });
    return types;
  }),
  createAssessment: protectedProcedure
    .input(
      z.object({
        applicableMeasureId: z.string(),
        patientId: z.string().optional(),
        newPatientName: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;
      if (!input.patientId && !input.newPatientName) {
        throw new Error("Patient ID or Name is required");
      }
      let patientId = input.patientId;
      if (!input.patientId && input.newPatientName) {
        const newPatient = await db.patient.create({
          data: {
            name: input.newPatientName,
            uid: session.user.id,
          },
        });
        patientId = newPatient.id;
      }
      const assessment = await db.assessment.create({
        data: {
          uid: session.user.id,
          applicableMeasureId: input.applicableMeasureId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          patientId: patientId!,
        },
      });
      return assessment;
    }),
  saveAnswers: protectedProcedure
    .input(
      z.object({
        assessmentId: z.string(),
        answers: z.array(
          z.object({
            questionOptionId: z.string(),
            questionId: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const answers = await db.assessmentAnswer.createMany({
        data: input.answers.map((answer) => ({
          assessmentId: input.assessmentId,
          optionId: answer.questionOptionId,
          questionId: answer.questionId,
        })),
      });
      return answers;
    }),
};

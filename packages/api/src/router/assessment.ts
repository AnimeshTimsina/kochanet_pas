import { z } from "zod";

import { protectedProcedure, throwNotFoundError } from "../trpc";

export const assessmentRouter = {
  all: protectedProcedure
    .input(
      z
        .object({
          take: z.number(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const count = await db.assessment.count({
        where: {
          uid: session.user.id,
        },
      });
      const assessments = await db.assessment.findMany({
        where: {
          uid: session.user.id,
        },
        include: {
          applicableMeasure: {
            include: {
              assessmentType: true,
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input?.take,
      });
      return { assessments, count };
    }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const assessment = await db.assessment.findUnique({
        where: {
          id: input.id,
          uid: session.user.id,
        },
        include: {
          applicableMeasure: {
            include: {
              Question: {
                include: {
                  QuestionOption: true,
                },
              },
            },
          },
          patient: true,
        },
      });
      if (!assessment) {
        throwNotFoundError("Assessment not found");
      }
      const answers = await db.assessmentAnswer.findMany({
        where: {
          assessmentId: assessment!.id,
        },
      });
      const formatted = {
        ...assessment!,
        applicableMeasure: {
          ...assessment!.applicableMeasure,
          Question: assessment!.applicableMeasure.Question.map((question) => {
            let correct = false;
            if (question.questionType === "READ_ONLY") {
              correct = true;
            }
            const correctAnswers = question.QuestionOption.filter(
              (o) => o.isCorrect,
            );
            const answersForThisQuestion = answers.filter(
              (a) => a.questionId === question.id,
            );
            const incorrectOptionSelected = answersForThisQuestion.some(
              (a) => !correctAnswers.find((c) => c.id === a.optionId),
            );
            const someCorrectOptionMissing = correctAnswers.some(
              (c) => !answersForThisQuestion.find((a) => a.optionId === c.id),
            );
            if (incorrectOptionSelected || someCorrectOptionMissing) {
              correct = false;
            } else {
              correct = true;
            }
            return { ...question, correct };
          }),
        },
      };
      const score = formatted.applicableMeasure.Question.filter(
        (q) => q.correct,
      ).length;
      const numberOfQuestions = formatted.applicableMeasure.Question.length;

      return { ...formatted, score, numberOfQuestions, answers };
    }),
  typesAndMeasures: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;
    const types = await db.assessmentType.findMany({
      include: {
        ApplicableMeasure: true,
      },
      where: {
        uid: session.user.id,
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
      // Removing old answers
      await db.assessmentAnswer.deleteMany({
        where: {
          assessmentId: input.assessmentId,
        },
      });

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

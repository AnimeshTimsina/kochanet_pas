import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  protectedProcedure,
  throwNotFoundError,
  throwUnauthorizedError,
} from "../trpc";

export const applicableMeasureRouter = {
  addUpdate: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        id: z.string().optional(),
        assessmentTypeId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;
      try {
        const assessmentType = await db.assessmentType.findUnique({
          where: {
            id: input.assessmentTypeId,
          },
        });
        if (!assessmentType) {
          throwNotFoundError("Assessment Type doesn't exist");
        }
        if (assessmentType!.uid !== session.user.id) {
          throwUnauthorizedError();
        }
        if (input.id) {
          const toUpdate = await db.applicableMeasure.findUnique({
            where: {
              id: input.id,
            },
            include: {
              assessmentType: true,
            },
          });
          if (!toUpdate) {
            throwNotFoundError();
          }
          if (toUpdate!.assessmentType.id !== session.user.id) {
            throwUnauthorizedError();
          }
          const updated = await db.applicableMeasure.update({
            where: {
              id: input.id,
            },
            data: {
              name: input.name,
              assessmentTypeId: input.assessmentTypeId,
            },
          });
          return updated;
        } else {
          const newRecord = await db.applicableMeasure.create({
            data: {
              name: input.name,
              assessmentTypeId: input.assessmentTypeId,
            },
          });
          return newRecord;
        }
      } catch (err) {
        const error = err as { code: string };
        if (error.code === "P2002") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Measure with same name and assessment type already exists",
          });
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
          });
        }
      }
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const type = await db.applicableMeasure.findUnique({
        where: {
          id: input.id,
        },
        include: {
          assessmentType: true,
        },
      });
      if (!type) {
        throwNotFoundError();
      }
      if (type!.assessmentType.uid !== ctx.session.user.id) {
        throwUnauthorizedError();
      }
      const deleted = await db.applicableMeasure.delete({
        where: {
          id: input.id,
        },
      });
      return deleted;
    }),
};

import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  protectedProcedure,
  throwNotFoundError,
  throwUnauthorizedError,
} from "../trpc";

export const assessmentTypeRouter = {
  all: protectedProcedure.query(async ({ ctx }) => {
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
  addUpdate: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        id: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;
      try {
        if (input.id) {
          const toUpdate = await db.assessmentType.findUnique({
            where: {
              id: input.id,
            },
          });
          if (!toUpdate) {
            throwNotFoundError();
          }
          if (toUpdate!.uid !== session.user.id) {
            throwUnauthorizedError();
          }
          const updatedType = await db.assessmentType.update({
            where: {
              id: input.id,
            },
            data: {
              name: input.name,
            },
          });
          return updatedType;
        } else {
          const newType = await db.assessmentType.create({
            data: {
              name: input.name,
              uid: session.user.id,
            },
          });
          return newType;
        }
      } catch (err) {
        const error = err as { code: string };
        if (error.code === "P2002") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Type already exists",
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
      const type = await db.assessmentType.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!type) {
        throwNotFoundError();
      }
      if (type!.uid !== ctx.session.user.id) {
        throwUnauthorizedError();
      }
      const deletedType = await db.assessmentType.delete({
        where: {
          id: input.id,
        },
      });
      return deletedType;
    }),
};

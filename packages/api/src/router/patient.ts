import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  protectedProcedure,
  throwNotFoundError,
  throwUnauthorizedError,
} from "../trpc";

export const patientRouter = {
  all: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;
    const types = await db.patient.findMany({
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
          const toUpdate = await db.patient.findUnique({
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
          const updated = await db.patient.update({
            where: {
              id: input.id,
            },
            data: {
              name: input.name,
            },
          });
          return updated;
        } else {
          const newRecord = await db.patient.create({
            data: {
              name: input.name,
              uid: session.user.id,
            },
          });
          return newRecord;
        }
      } catch (err) {
        const error = err as { code: string };
        if (error.code === "P2002") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Patient with this name already exists",
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
      const record = await db.patient.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!record) {
        throwNotFoundError();
      }
      if (record!.uid !== ctx.session.user.id) {
        throwUnauthorizedError();
      }
      const deleted = await db.patient.delete({
        where: {
          id: input.id,
        },
      });
      return deleted;
    }),
};

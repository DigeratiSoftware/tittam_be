// controllers/field.controller.ts
import { Request, Response, NextFunction } from "express";
import { fieldService } from "../services/field.service";

export const FieldController = {
  createField: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body)
      const createdBy = (req as any).user?.email || "system";
      const field = await fieldService.createField({ ...req.body, createdBy });
      res.status(201).json(field);
    } catch (err) {
      next(err);
    }
  },

  getNumberFields: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fields = await fieldService.getNumberFields();
      res.json({
        success: true,
        data: fields, // your array of fields
      })
    } catch (err) {
      next(err);
    }
  },

  getFieldsByComponentId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const componentId = req.params.componentId;
      const fields = await fieldService.getFieldsByComponentId(componentId);
      res.json({
        success: true,
        data: fields, // your array of fields
      });
    } catch (err) {
      next(err);
    }
  },

  updateField: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const field = await fieldService.updateField(id, req.body);
      res.json(field);
    } catch (err) {
      next(err);
    }
  },

  deleteField: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await fieldService.deleteField(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  getAllFields: async (req: Request, res: Response, next: NextFunction) => {
    try {
/* The line `const fields = await fieldService.getAllFields();` is calling the `getAllFields` method
from the `fieldService` object asynchronously. This method is likely fetching all fields from a data
source (such as a database) and returning them. The `await` keyword is used to wait for the
asynchronous operation to complete and then assign the result to the `fields` variable. Finally, the
`res.json(fields);` statement sends the fetched fields as a JSON response to the client. */
      // const fields = await fieldService.getAllFields();
      // res.json(fields);
    } catch (err) {
      next(err);
    }
  },
};

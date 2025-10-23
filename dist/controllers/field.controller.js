"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldController = void 0;
const field_service_1 = require("../services/field.service");
exports.FieldController = {
    createField: async (req, res, next) => {
        try {
            console.log(req.body);
            const createdBy = req.user?.email || "system";
            const field = await field_service_1.fieldService.createField({ ...req.body, createdBy });
            res.status(201).json(field);
        }
        catch (err) {
            next(err);
        }
    },
    getNumberFields: async (req, res, next) => {
        try {
            const fields = await field_service_1.fieldService.getNumberFields();
            res.json({
                success: true,
                data: fields, // your array of fields
            });
        }
        catch (err) {
            next(err);
        }
    },
    getFieldsByComponentId: async (req, res, next) => {
        try {
            const componentId = req.params.componentId;
            const fields = await field_service_1.fieldService.getFieldsByComponentId(componentId);
            res.json({
                success: true,
                data: fields, // your array of fields
            });
        }
        catch (err) {
            next(err);
        }
    },
    updateField: async (req, res, next) => {
        try {
            const id = req.params.id;
            const field = await field_service_1.fieldService.updateField(id, req.body);
            res.json(field);
        }
        catch (err) {
            next(err);
        }
    },
    deleteField: async (req, res, next) => {
        try {
            const id = req.params.id;
            await field_service_1.fieldService.deleteField(id);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    },
    getAllFields: async (req, res, next) => {
        try {
            /* The line `const fields = await fieldService.getAllFields();` is calling the `getAllFields` method
            from the `fieldService` object asynchronously. This method is likely fetching all fields from a data
            source (such as a database) and returning them. The `await` keyword is used to wait for the
            asynchronous operation to complete and then assign the result to the `fields` variable. Finally, the
            `res.json(fields);` statement sends the fetched fields as a JSON response to the client. */
            // const fields = await fieldService.getAllFields();
            // res.json(fields);
        }
        catch (err) {
            next(err);
        }
    },
};

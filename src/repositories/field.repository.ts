// repositories/field.repository.ts
import { Field, IField } from "../models/field.model";

export const FieldRepository = {
  create: (field: Partial<IField>) => Field.create(field),

  findById: (id: string) => Field.findById(id),

  findByComponentId: (componentId: string) => Field.find({ componentId }),

 findDefaultAndComponentFields: async (componentId: string | null, category: string) => {
  // Always fetch default fields
  const defaultFieldsPromise = Field.find({ type: "default", category }).sort({ order: 1 })

  // Fetch component-specific fields only if componentId is provided
  const componentFieldsPromise = componentId
    ? Field.find({ componentId }).sort({ order: 1 })
    : Promise.resolve([]) // return empty array if no componentId

  // Wait for both queries
  const [defaultFields, componentFields] = await Promise.all([defaultFieldsPromise, componentFieldsPromise])

  // Combine them
  return [...defaultFields, ...componentFields]
},

  updateById: (id: string, data: Partial<IField>) =>
    Field.findByIdAndUpdate(id, data, { new: true }),

  deleteById: (id: string) => Field.findByIdAndDelete(id),

  findByNumberType: async (): Promise<IField[]> => {
    // Fetch fields where dataType is 'number', 'decimal', or 'float'
    return Field.find({
      dataType: { $in: ["number", "decimal", "float"] },
    }).sort({ order: 1 }).select({ _id: 0, fieldId: 1, name: 1 });
  },

   async count() {
    return Field.countDocuments();
  },
};

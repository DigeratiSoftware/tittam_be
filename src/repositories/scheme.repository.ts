import { IScheme, Scheme } from "../models/scheme.model";
import { FilterQuery, UpdateQuery } from "mongoose";

export const schemeRepository = {
  // ---------------- CREATE ----------------
  async create(data: Partial<IScheme>): Promise<IScheme> {
    return Scheme.create(data);
  },

  // ---------------- FIND ALL ----------------
  async findAll(): Promise<IScheme[]> {
    return Scheme.find();
  },

  // ---------------- FIND BY schemeId ----------------
  async findById(schemeId: string): Promise<IScheme | null> {
    return Scheme.findOne({ schemeId });
  },

  // ---------------- FIND ONE ----------------
  async findOne(filter: FilterQuery<IScheme>): Promise<IScheme | null> {
    return Scheme.findOne(filter);
  },

  // ---------------- UPDATE ----------------
  async updateBySchemeId(schemeId: string, update: UpdateQuery<IScheme>): Promise<IScheme | null> {
    return Scheme.findOneAndUpdate({ schemeId }, update, { new: true });
  },

  // ---------------- DELETE ----------------
  async deleteBySchemeId(schemeId: string): Promise<void> {
    await Scheme.findOneAndDelete({ schemeId });
  }
};

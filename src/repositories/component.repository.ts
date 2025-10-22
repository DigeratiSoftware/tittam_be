import { IComponent, Component } from "../models/component.model";
import { FilterQuery, UpdateQuery } from "mongoose";

export const componentRepository = {
  async create(data: Partial<IComponent>): Promise<IComponent> {
    return Component.create(data);
  },

  async findAll(): Promise<IComponent[]> {
    return Component.find();
  },

  async findById(componentId: string): Promise<IComponent | null> {
    return Component.findOne({ componentId });
  },

  async findOne(filter: FilterQuery<IComponent>): Promise<IComponent | null> {
    return Component.findOne(filter);
  },

  async updateByComponentId(componentId: string, update: UpdateQuery<IComponent>): Promise<IComponent | null> {
    return Component.findOneAndUpdate({ componentId }, update, { new: true });
  },

  async deleteByComponentId(componentId: string): Promise<void> {
    await Component.findOneAndDelete({ componentId });
  }
};

import { schemeRepository } from "../repositories/scheme.repository";
import { IScheme, CreateSchemeRequest, SchemeStatus } from "../models/scheme.model";
import { HttpError } from "../utils/http-error";

export const schemeService = {
  // ---------------- GET ALL ----------------
  async getAllSchemes(): Promise<IScheme[]> {
    return schemeRepository.findAll();
  },

  // ---------------- GET BY ID ----------------
  async getSchemeById(schemeId: string): Promise<IScheme> {
    const scheme = await schemeRepository.findById(schemeId);
    if (!scheme) throw new HttpError(404, "Scheme not found");
    return scheme;
  },

  // ---------------- CREATE ----------------
async createScheme(request: CreateSchemeRequest, createdByEmail: string): Promise<IScheme> {
  // Normalize scheme name: lowercase, remove spaces, dots, and hyphens
  const normalizedName = request.englishName
    .toLowerCase()
    .replace(/\s+/g, '')   // remove all spaces
    .replace(/[.-]/g, ''); // remove dots and hyphens

  // Check if a scheme with the same normalized name exists
  const existing = await schemeRepository.findOne({ normalizedEnglishName: normalizedName });

  if (existing) {
    throw new HttpError(409, "Scheme name already exists");
  }

  // Prepare new scheme
  const newScheme: Partial<IScheme> = {
    ...request,
    status: "ACTIVE",
    createdBy: createdByEmail,
    updatedBy: createdByEmail,
    normalizedEnglishName: normalizedName, // save normalized name for future queries
  };

  // Create scheme
  return schemeRepository.create(newScheme);
},


  // ---------------- UPDATE ----------------
  async updateScheme(schemeId: string, request: Partial<CreateSchemeRequest>, updatedByEmail: string): Promise<IScheme> {
    const updatedScheme: Partial<IScheme> = {
      ...request,
      updatedBy: updatedByEmail,
    };
    const result = await schemeRepository.updateBySchemeId(schemeId, updatedScheme);
    if (!result) throw new HttpError(404, "Scheme not found");
    return result;
  },

  // ---------------- ACTIVATE / DEACTIVATE ----------------
  async setStatus(schemeId: string, status: SchemeStatus, updatedByEmail: string): Promise<IScheme> {
    const updatedScheme = await schemeRepository.updateBySchemeId(schemeId, { status, updatedBy: updatedByEmail });
    if (!updatedScheme) throw new HttpError(404, "Scheme not found");
    return updatedScheme;
  },

  // ---------------- DELETE ----------------
  async deleteScheme(schemeId: string): Promise<void> {
    await schemeRepository.deleteBySchemeId(schemeId);
  },
};

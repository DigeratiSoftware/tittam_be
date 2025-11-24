export interface IASDetails {
  administrativeSanctionNo?: string;
  administrativeSanctionDate?: string;
  asCopy?: string;
}

export interface ITSDDetails {
  technicalSanctionNo?: string;
  technicalSanctionDate?: string;
  tsCopy?: string;
}

export interface IFundDetails {
  fundReleased?: string;
  expenditure?: string;
  balanceFundReleased?: number;
  balanceExpenditureOnFundReleased?: number;
  balanceExpenditureOnEstimate?: number;
}

export interface ITenderDetails {
  tenderDate?: string;
  contractorGstNo?: string;
  contractorName?: string;
  agreementDate?: string;
  agreementDuration?: string;
  workOrderDate?: string;
  tenderCopy?: string;
  aggrementCopy?: string;
}

export interface IWorkDetails {
  wardNo?: string;
  typeOfRoadEnglish?: string;
  nameOfWorkEnglish?: string;
  nameOfWorkTamil?: string;
  noOfRoadsPackage?: string;
  workOrderCopy?: string;
}

export interface IWorkProgress {
  stage?: string;
  workProgressPercentage?: string;
  presentWorkStatus?: string;
  probableDateOfCompletion?: string;
  photograph?: string;
}

export interface IWork {
  schemeId?: string;
  componentId?: string;
  schemeName?: string;
  componentName?: string;
  workName?: string;
  announcementScheme?: boolean;
  flagshipScheme?: boolean;
  district?: string;
  townPanchayat?: string;
  zone?: string;
  financialYear?: string;
  implementationAgency?: string;

  // All arrays optional
  asDetails?: IASDetails[];
  tsDetails?: ITSDDetails[];
  fundDetails?: IFundDetails[];
  tenderDetails?: ITenderDetails[];
  workDetails?: IWorkDetails[];
  workProgress?: IWorkProgress[];

  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

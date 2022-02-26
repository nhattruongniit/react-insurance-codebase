export interface IEmployer {
  BrokerCompanyId: number;
  CompanyId: number;
  CompanyName: string;
  CountryName: string;
  Currency: string | null;
  InsuranceBroker: string;
  InsuranceCurrency: null;
  Insurer: string;
  InsurerCompanyId: number;
  IsActive: boolean;
  NPWPNumber: number | null;
  PolicyId: string;
  PolicyNumber: string;
  RegistrationNumber: number | null;
  TotalActiveMember: number;
  TotalActivePremium: number;
  TotalPremiumRenewal: number;
}

export interface IResponseEmployers {
  data: IEmployer[];
  totalCount: number;
}

export interface IFetchEmployerArgs {
  skip: number;
  take: number;
  requireTotalCount?: boolean;
}

export interface IEmployersState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errMsg: string;
  dataList: IEmployer[];
  totalCount: number;
}

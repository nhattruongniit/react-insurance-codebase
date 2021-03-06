import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { FilteringState, IntegratedFiltering, PagingState, CustomPaging, SearchState, Column } from '@devexpress/dx-react-grid';
import {
  Grid,
  DragDropProvider,
  Table,
  TableHeaderRow,
  TableColumnReordering,
  TableFilterRow,
  PagingPanel,
  ColumnChooser,
  TableColumnVisibility,
  TableFixedColumns,
  Toolbar,
  SearchPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import { DEFAULT_PAGE_SIZE, PAGE_SZIES } from 'configs/constants';
import { fetchEmployers } from 'state/employers/employersAPIs';
import { useAppSelector } from 'state/hooks';
import { employersSelector } from 'state/employers/employersSlice';
import LoadingTable from 'components/LoadingTable/LoadingTable';

const mockData = {
  data: [
    {
      PolicyId: 'c7a768c3-1b61-41e1-ab03-460ec122c50f',
      CompanyId: 323,
      CompanyName: 'ZURI HOTEL MANAJEMEN, PT',
      RegistrationNumber: null,
      NPWPNumber: null,
      Insurer: 'Avrist Assurance, PT',
      InsuranceBroker: 'PAIB Indonesia, PT',
      PolicyNumber: '0000092910',
      IsActive: true,
      BrokerCompanyId: 185,
      InsurerCompanyId: 8,
      TotalActiveMember: 88,
      CountryName: 'Indonesia',
      InsuranceCurrency: null,
      TotalActivePremium: 38194939,
      TotalPremiumRenewal: 0,
      Currency: null,
    },
    {
      PolicyId: 'c7a768c3-1b61-41e1-ab03-460ec122c50f',
      CompanyId: 323,
      CompanyName: 'ZURI HOTEL MANAJEMEN, PT',
      RegistrationNumber: null,
      NPWPNumber: null,
      Insurer: 'Avrist Assurance, PT',
      InsuranceBroker: 'PAIB Indonesia, PT',
      PolicyNumber: '0000092910',
      IsActive: true,
      BrokerCompanyId: 185,
      InsurerCompanyId: 8,
      TotalActiveMember: 1,
      CountryName: 'Indonesia',
      InsuranceCurrency: 'ALL',
      TotalActivePremium: 7598564,
      TotalPremiumRenewal: 0,
      Currency: null,
    },
    {
      PolicyId: 'c7a768c3-1b61-41e1-ab03-460ec122c50f',
      CompanyId: 323,
      CompanyName: 'ZURI HOTEL MANAJEMEN, PT',
      RegistrationNumber: null,
      NPWPNumber: null,
      Insurer: 'Avrist Assurance, PT',
      InsuranceBroker: 'PAIB Indonesia, PT',
      PolicyNumber: '0000092910',
      IsActive: true,
      BrokerCompanyId: 185,
      InsurerCompanyId: 8,
      TotalActiveMember: 31,
      CountryName: 'Indonesia',
      InsuranceCurrency: 'IDR',
      TotalActivePremium: 1622703,
      TotalPremiumRenewal: 0,
      Currency: null,
    },
    {
      PolicyId: '930bc688-5376-4293-b1c3-fa4198b9f82e',
      CompanyId: 312,
      CompanyName: 'YAYASAN MENARA BHAKTI QQ UNIVERSITAS MERCU BUANA',
      RegistrationNumber: null,
      NPWPNumber: null,
      Insurer: 'Asuransi Jiwa Central Asia Raya, PT',
      InsuranceBroker: 'Global Insurance Broker, PT',
      PolicyNumber: '010075366',
      IsActive: true,
      BrokerCompanyId: 134,
      InsurerCompanyId: 16,
      TotalActiveMember: 1729,
      CountryName: 'Indonesia',
      InsuranceCurrency: null,
      TotalActivePremium: 42441972,
      TotalPremiumRenewal: 0,
      Currency: null,
    },
    {
      PolicyId: 'bbe52ccb-8269-4604-a9b0-1916b74b19f3',
      CompanyId: 317,
      CompanyName: 'WONDERFUL INDAH JAYA, PT',
      RegistrationNumber: null,
      NPWPNumber: null,
      Insurer: 'BNI Life Insurance, PT',
      InsuranceBroker: 'Global Insurance Broker, PT',
      PolicyNumber: '1930/PK-KES/0616',
      IsActive: true,
      BrokerCompanyId: 134,
      InsurerCompanyId: 13,
      TotalActiveMember: 4,
      CountryName: 'Indonesia',
      InsuranceCurrency: 'IDR',
      TotalActivePremium: 5051600,
      TotalPremiumRenewal: 0,
      Currency: null,
    },
    {
      PolicyId: 'bbe52ccb-8269-4604-a9b0-1916b74b19f3',
      CompanyId: 317,
      CompanyName: 'WONDERFUL INDAH JAYA, PT',
      RegistrationNumber: null,
      NPWPNumber: null,
      Insurer: 'BNI Life Insurance, PT',
      InsuranceBroker: 'Global Insurance Broker, PT',
      PolicyNumber: '1930/PK-KES/0616',
      IsActive: true,
      BrokerCompanyId: 134,
      InsurerCompanyId: 13,
      TotalActiveMember: 32,
      CountryName: 'Indonesia',
      InsuranceCurrency: null,
      TotalActivePremium: 15282000,
      TotalPremiumRenewal: 0,
      Currency: null,
    },
    {
      PolicyId: 'c6a12778-db9f-4866-8759-0b25f8caf6bb',
      CompanyId: 284,
      CompanyName: 'Wisata Triloka Buana - Le Meridien Hotel, PT',
      RegistrationNumber: '12345678910',
      NPWPNumber: '028087153023000',
      Insurer: 'Asuransi Reliance Indonesia, PT',
      InsuranceBroker: 'Global Insurance Broker, PT',
      PolicyNumber: '01181201100190700',
      IsActive: true,
      BrokerCompanyId: 134,
      InsurerCompanyId: 64,
      TotalActiveMember: 23,
      CountryName: 'Indonesia',
      InsuranceCurrency: 'USD',
      TotalActivePremium: 2125700,
      TotalPremiumRenewal: 0,
      Currency: null,
    },
    {
      PolicyId: 'c6a12778-db9f-4866-8759-0b25f8caf6bb',
      CompanyId: 284,
      CompanyName: 'Wisata Triloka Buana - Le Meridien Hotel, PT',
      RegistrationNumber: '12345678910',
      NPWPNumber: '028087153023000',
      Insurer: 'Asuransi Reliance Indonesia, PT',
      InsuranceBroker: 'Global Insurance Broker, PT',
      PolicyNumber: '01181201100190700',
      IsActive: true,
      BrokerCompanyId: 134,
      InsurerCompanyId: 64,
      TotalActiveMember: 68,
      CountryName: 'Indonesia',
      InsuranceCurrency: null,
      TotalActivePremium: 16290400,
      TotalPremiumRenewal: 0,
      Currency: null,
    },
    {
      PolicyId: '7cbf81ea-7923-49da-9dbd-611738ee33a2',
      CompanyId: 342,
      CompanyName: 'Weefer Indonesia, PT',
      RegistrationNumber: null,
      NPWPNumber: null,
      Insurer: 'BNI Life Insurance, PT',
      InsuranceBroker: 'Global Insurance Broker, PT',
      PolicyNumber: '5645/PK-SME/0821',
      IsActive: true,
      BrokerCompanyId: 134,
      InsurerCompanyId: 13,
      TotalActiveMember: 45,
      CountryName: 'Indonesia',
      InsuranceCurrency: null,
      TotalActivePremium: 6011500,
      TotalPremiumRenewal: 0,
      Currency: null,
    },
    {
      PolicyId: 'e2e82a87-1a3e-48af-973b-e3526ff1b357',
      CompanyId: 346,
      CompanyName: 'Twibbonize Teknologi Indonesia, PT',
      RegistrationNumber: null,
      NPWPNumber: null,
      Insurer: 'Asuransi Multi Artha Guna Tbk, PT',
      InsuranceBroker: 'Global Insurance Broker, PT',
      PolicyNumber: 'JKT.GHS.949.001',
      IsActive: true,
      BrokerCompanyId: 134,
      InsurerCompanyId: 60,
      TotalActiveMember: 13,
      CountryName: 'Indonesia',
      InsuranceCurrency: null,
      TotalActivePremium: 11605248,
      TotalPremiumRenewal: 0,
      Currency: null,
    },
  ],
  totalCount: 70,
};

const ActionCell = ({ row, column, ...restProps }: any) =>
  column.name === 'actions' ? (
    <Table.Cell {...restProps}>
      <Button
        onClick={() => {
          alert(JSON.stringify(row));
        }}
      >
        View
      </Button>
    </Table.Cell>
  ) : (
    <Table.Cell row={row} column={column} {...restProps} />
  );

const DataTable = () => {
  const dispatch = useDispatch();
  const { dataList, totalCount, isFetching } = useAppSelector(employersSelector);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [rightColumns] = useState<Array<string | symbol>>(['actions']);
  const [searchValue, setSearchState] = useState<string>('');
  const columns: Column[] = useMemo(
    () => [
      { name: 'CompanyName', title: t('employers.table.company') },
      { name: 'TotalActiveMember', title: t('employers.table.total_active_member') },
      { name: 'InsuranceCurrency', title: t('employers.table.insurance_premium_currency') },
      { name: 'TotalActivePremium', title: t('employers.table.total_active_premium') },
      { name: 'TotalPremiumRenewal', title: t('employers.table.total_active_premium_renewal') },
      { name: 'CountryName', title: t('employers.table.country') },
      { name: 'Insurer', title: t('employers.table.insurer') },
      { name: 'InsuranceBroker', title: t('employers.table.insurance_broker') },
      { name: 'actions', title: t('employers.table.actions') },
    ],
    [t],
  );
  const tableColumnExtensions: Table.ColumnExtension[] = useMemo(
    () => [
      {
        columnName: 'actions',
        width: 100,
        align: 'center',
      },
    ],
    [],
  );

  const filteringStateColumnExtensions: FilteringState.ColumnExtension[] = useMemo(
    () => [
      {
        columnName: 'actions',
        filteringEnabled: false,
      },
    ],
    [],
  );

  function handleChangePageSize(pageNumber: number): void {
    setCurrentPage(0);
    setPageSize(pageNumber);
  }

  useEffect(() => {
    dispatch(fetchEmployers({ skip: pageSize * currentPage, take: pageSize, requireTotalCount: true }));
  }, [dispatch, currentPage, pageSize]);

  return (
    <Paper sx={{ position: 'relative' }}>
      <Grid rows={mockData.data} columns={columns}>
        <FilteringState columnExtensions={filteringStateColumnExtensions} />
        <SearchState value={searchValue} onValueChange={setSearchState} />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={handleChangePageSize}
        />
        <CustomPaging totalCount={totalCount} />

        <IntegratedFiltering />

        <DragDropProvider />
        <Table cellComponent={ActionCell} columnExtensions={tableColumnExtensions} />
        <TableColumnReordering />
        <TableHeaderRow />
        <TableFilterRow />
        <PagingPanel pageSizes={PAGE_SZIES} />
        <TableColumnVisibility />
        <TableFixedColumns rightColumns={rightColumns} />
        <Toolbar />
        <Plugin>
          <Template name="toolbarContent">
            <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <Button color="primary" variant="contained">
                Create Employer
              </Button>
            </Box>
            <TemplatePlaceholder />
          </Template>
        </Plugin>
        <SearchPanel />
        <ColumnChooser />
      </Grid>
      {isFetching && <LoadingTable />}
    </Paper>
  );
};

export default DataTable;

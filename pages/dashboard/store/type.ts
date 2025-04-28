export interface TableColumn {
  prop: string;
  width: number;
  label: string;
  slot?: boolean;
  formatter?: ({ row, cell }: { row: any; cell: string }) => string | any;
}
export interface StoreData {
  id: string;
  icon: string;
  name: string;
  account: string;
  shelveOrder: string;
  shelveAuth: string;
  fulfillmentOrder: string;
  fulfillmentAuth: string;
}

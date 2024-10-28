export interface CumulativeReturn {
  cumulative_return: number;
  initial_price: number;
  final_price: number;
  start_data: string;
  end_date: string;
}

export interface Sector {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  name: string;
  sector_level_one: Sector;
  sector_level_two: Sector;
}

export interface Stock {
  id: number;
  asof: string;
  close_usd: number;
  company: Company;
  volume: number;
}

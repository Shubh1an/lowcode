import OverviewCard from './OverviewCard';

import '../service/service.js';
import withCard from '../withCard';
import FunnelGraph from './FunnelGraph';
import RecentDeals from './RecentDeals';
import SalesChart from './SalesChart';
import SalesGraph from './SalesGraph';
import TargetProgress from './TargetProgress';
import TopDeals from './TopDeals';
import { useSelector } from 'react-redux';
const OverviewCardWithCard = withCard(OverviewCard);
const SalesChartWithCard = withCard(SalesChart);
const TargetProgressWithCard = withCard(TargetProgress);
const FunnelGraphWithCard = withCard(FunnelGraph);
const RecentDealsWithCard = withCard(RecentDeals);
const TopDealsWithCard = withCard(TopDeals);
const SalesGraphWithCard = withCard(SalesGraph);

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Sales Dashboard</h1>
        <button className="bg-black text-white px-4 py-2 rounded">
          Add Widget
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCardWithCard title="Active Deals" value="$53,00989" />
        <OverviewCardWithCard title="Total Sales" value="$53,00989" />
        <OverviewCardWithCard title="Dead Leads" value="450" />
        <OverviewCardWithCard title="Lost Deals" value="$5000" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TargetProgressWithCard />
        <SalesChartWithCard />
        <FunnelGraphWithCard />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDealsWithCard />
        <TopDealsWithCard />
      </div>
      <div className="grid grid-cols-1">
        <SalesGraphWithCard />
      </div>
    </div>
  );
};

export default Dashboard;

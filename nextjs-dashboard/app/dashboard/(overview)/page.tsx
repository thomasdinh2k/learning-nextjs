import CardWrapper, { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import {
  fetchCardData,
  fetchLatestInvoices,
  fetchRevenue,
} from '../../lib/data';
import { Suspense } from 'react';
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
  // const rev = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();

  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  console.table({
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  });
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard (Fetching Data)
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        <Suspense fallback={<CardSkeleton/>}>
          <CardWrapper/>
        </Suspense>


      </div>
    </main>
  );
}

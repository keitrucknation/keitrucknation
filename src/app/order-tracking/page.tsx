import React from 'react';
import OrderTrackingClient from './components/OrderTrackingClient';

export const metadata = {
  title: 'Order Tracking | KeiTruckNation',
  description:
    'Track your kei truck order from Japan to your door - real-time status updates on every stage of the import and delivery process.',
};

export default function OrderTrackingPage() {
  return <OrderTrackingClient />;
}

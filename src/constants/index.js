import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/coming-soon',
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/coming-soon',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
];
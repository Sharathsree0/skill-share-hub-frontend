import { IndianRupee, ArrowUpRight, ArrowDownRight, TrendingUp, CreditCard, Wallet, Percent } from 'lucide-react';

const earningsData = [
  { id: 1, label: 'Course Enrollments', amount: '₹84,250.00', percentage: '+12.5%', isPositive: true, icon: TrendingUp, iconColor: 'text-blue-400', iconBg: 'bg-blue-500/10' },
  { id: 2, label: 'Platform Fees', amount: '₹15,420.00', percentage: '+5.2%', isPositive: true, icon: Percent, iconColor: 'text-purple-400', iconBg: 'bg-purple-500/10' },
  { id: 3, label: 'Withdrawal Comm.', amount: '₹3,180.00', percentage: '-2.4%', isPositive: false, icon: Wallet, iconColor: 'text-amber-400', iconBg: 'bg-amber-500/10' },
  { id: 4, label: 'Subscriptions', amount: '₹21,650.00', percentage: '+18.1%', isPositive: true, icon: CreditCard, iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10' },
];

export default function AdminEarnings() {
  return (
    <div className="bg-[#13161b] p-5 rounded-xl border border-gray-800 w-full h-full flex flex-col">

      {/* Header */}
      <div className="mb-5 shrink-0">
        <h2 className="text-sm font-semibold text-white tracking-tight">Revenue Breakdown</h2>
        <p className="text-xs text-gray-500 mt-0.5">Platform earnings distribution.</p>
      </div>

      {/* Total Revenue Card */}
      <div className="relative rounded-lg bg-[#0d0f12] border border-gray-800 p-5 mb-5 shrink-0 overflow-hidden">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-gray-800 rounded-md">
              <IndianRupee size={13} className="text-gray-400" />
            </div>
            <span className="text-[10px] font-medium tracking-[0.2em] text-gray-500 uppercase">Total Revenue</span>
          </div>
          <p className="text-3xl font-bold text-white font-mono tracking-tight">₹1,24,500.00</p>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
              <ArrowUpRight size={12} strokeWidth={2.5} />
              +14.2%
            </span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        </div>
      </div>

      {/* Breakdown List */}
      <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-gray-800">
        {earningsData.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-800/50 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.iconBg} ${item.iconColor}`}>
                  <Icon size={15} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">{item.label}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {item.isPositive
                      ? <ArrowUpRight size={11} className="text-emerald-400" strokeWidth={2.5} />
                      : <ArrowDownRight size={11} className="text-red-400" strokeWidth={2.5} />
                    }
                    <span className={`text-[10px] font-medium ${item.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {item.percentage}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-200 font-mono">{item.amount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
import { RefreshCcw, Wallet } from 'lucide-react';

export function WalletBalance() {
  return (
    <div className="min-w-[400px] overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-xl">

      <div className="flex items-center justify-between p-5 bg-[#164e33]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-white">Wallet Balance</h2>
        </div>
        <button className="p-2 transition-colors cursor-pointer rounded-full hover:bg-white/10">
          <RefreshCcw className="w-4 h-4 text-white transition-transform animate-spin" />
        </button>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-50">
          <div className="text-sm font-medium text-gray-500">Credits</div>
          <div className="text-xl font-bold text-gray-900">120</div>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-gray-50">
          <div className="text-sm font-medium text-gray-500">Value</div>
          <div className="text-xl font-bold text-[#164e33]">₹1,200</div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Conversion Rate</div>
          <div className="px-2 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-md">
            1 credit = ₹10
          </div>
        </div>
        
        <button className="w-full py-2.5 mt-2 text-sm font-semibold text-white bg-[#164e33] rounded-xl hover:bg-[#1a5d3d] transition-all active:scale-[0.98]">
          Add Credits
        </button>
      </div>
    </div>
  );
}
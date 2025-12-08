import React from "react";
import { TrendingUp, User, ShoppingCart, Percent, LucideIcon } from "lucide-react"; 

interface AnalyticsCardProps {
  icon: LucideIcon; 
  title: string;
  value: string;
  trend: string;
  trendColor: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ 
  icon: Icon, 
  title, 
  value, 
  trend, 
  trendColor 
}) => (
  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
    <Icon className="w-6 h-6 text-[#7C5840] mb-2" /> 
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="text-3xl font-bold text-[#261C1A] mt-1">{value}</p>
    <p className={`text-sm mt-1 ${trendColor} flex items-center`}>
      <TrendingUp className="w-4 h-4 mr-1" />
      {trend}
    </p>
  </div>
);

const AnalyticsSection: React.FC = () => {
  return (
    <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-[#7C5840] mb-6 border-b pb-3">
        Ключові Метрики та Аналітика
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          icon={TrendingUp} 
          title="Виторг (за 30 днів)"
          value="1.2M ₴"
          trend="+15.5%"
          trendColor="text-green-600"
        />
        <AnalyticsCard
          icon={User}
          title="Нові клієнти"
          value="340"
          trend="+4.1%"
          trendColor="text-green-600"
        />
        <AnalyticsCard
          icon={ShoppingCart}
          title="Середній чек"
          value="2,800 ₴"
          trend="-2.8%"
          trendColor="text-red-600"
        />
        <AnalyticsCard
          icon={Percent} 
          title="Конверсія"
          value="3.5%"
          trend="+0.5%"
          trendColor="text-green-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#FBF0E6] p-6 rounded-lg shadow border border-[#E5C8AA]">
          <h3 className="text-xl font-semibold text-[#261C1A] mb-4">
            Графік продажів за останні 6 місяців
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            [/
          </div>
        </div>

        <div className="bg-[#FBF0E6] p-6 rounded-lg shadow border border-[#E5C8AA]">
          <h3 className="text-xl font-semibold text-[#261C1A] mb-4">
            Топ-5 за виторгом
          </h3>
          <ul className="space-y-3">
            <li className="flex justify-between text-gray-700 border-b pb-1">
              <span>1.</span>
              <span className="font-medium">120K ₴</span>
            </li>
            <li className="flex justify-between text-gray-700 border-b pb-1">
              <span>2."</span>
              <span className="font-medium">95K ₴</span>
            </li>
            <li className="flex justify-between text-gray-700 border-b pb-1">
              <span>3.</span>
              <span className="font-medium">78K ₴</span>
            </li>
            <li className="flex justify-between text-gray-700 border-b pb-1">
              <span>4.</span>
              <span className="font-medium">60K ₴</span>
            </li>
            <li className="flex justify-between text-gray-700 pb-1">
              <span>5.</span>
              <span className="font-medium">45K ₴</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
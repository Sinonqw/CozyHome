export const ContactInfoItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
}> = ({ icon, title, value }) => (
  <div className="flex items-start space-x-4 p-4 rounded-lg bg-white shadow-sm border border-[#E5C8AA]">
    <div className="text-[#7C5840] shrink-0">{icon}</div>
    <div>
      <h3 className="font-semibold text-lg text-[#261C1A]">{title}</h3>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);
export default ContactInfoItem;

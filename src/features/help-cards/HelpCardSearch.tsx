import { HC_INPUT } from "@/components/help-cards/help-cards-theme";

export function HelpCardSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-bold text-[#17212b]">
      What situation are you preparing for?
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What situation are you preparing for?"
        className={HC_INPUT}
      />
    </label>
  );
}

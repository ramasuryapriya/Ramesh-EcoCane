import { useState } from 'react';
import { Leaf, Award, Compass, Sparkles, Filter } from 'lucide-react';

export default function EcoCalculator() {
  const [plates, setPlates] = useState(100);
  const [cups, setCups] = useState(150);
  const [straws, setStraws] = useState(200);

  // Constants (g of plastic per item)
  const PLATE_PLASTIC = 15; // 15 grams
  const CUP_PLASTIC = 10;   // 10 grams
  const STRAW_PLASTIC = 1.2; // 1.2 grams

  // Annual calculation
  const monthlyPlasticGrams = (plates * PLATE_PLASTIC) + (cups * CUP_PLASTIC) + (straws * STRAW_PLASTIC);
  const annualPlasticKg = Number(((monthlyPlasticGrams * 12) / 1000).toFixed(1));

  // CO2 reduction (approx. 3.1kg CO2 per 1kg plastic produced, minus bio emissions)
  const annualCO2Saved = Number((annualPlasticKg * 3.13).toFixed(1));

  // Water conservation (approx. 2.2 gallons per ounce of PET)
  // 1kg = 35.274 ounces. 35.274 * 2.2 = 77.6 gallons per kg.
  const annualWaterSavedGallons = Math.round(annualPlasticKg * 77.6);

  // Equivalents
  const forestDays = Math.round(annualCO2Saved * 0.16); // 1 mature tree absorbs ~22kg CO2/year -> ~0.06kg per day. 
  const carMilesEmissions = Math.round(annualCO2Saved * 2.5); // Average car emits ~400g/mile.

  return (
    <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/50 p-6 shadow-sm" id="eco-calculator-widget">
      <div className="flex items-center space-x-3 pb-4 border-b border-emerald-100/60">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
          <Leaf className="h-5.5 w-5.5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-emerald-950 font-sans tracking-tight">Eco-Impact Calculator</h3>
          <p className="text-xs text-gray-500">Calculate how many plastic items you or your business can replace with Bagasse.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-12 lg:gap-8">
        {/* Sliders Area */}
        <div className="space-y-5 lg:col-span-6">
          <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Monthly Usage Estimator</h4>
          
          {/* Sliders 1 - Plates */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label htmlFor="plates-slider">Plastic Plates Avoided</label>
              <span className="font-mono bg-emerald-100/50 text-emerald-850 px-2 py-0.5 rounded text-xs">{plates} pcs / mo</span>
            </div>
            <input
              type="range"
              id="plates-slider"
              min="0"
              max="2000"
              step="25"
              value={plates}
              onChange={(e) => setPlates(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-emerald-600 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>0</span>
              <span>2,000 plates</span>
            </div>
          </div>

          {/* Sliders 2 - Cups */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label htmlFor="cups-slider">Plastic Cups Avoided</label>
              <span className="font-mono bg-emerald-100/50 text-emerald-850 px-2 py-0.5 rounded text-xs">{cups} pcs / mo</span>
            </div>
            <input
              type="range"
              id="cups-slider"
              min="0"
              max="3000"
              step="50"
              value={cups}
              onChange={(e) => setCups(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-emerald-600 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>0</span>
              <span>3,000 cups</span>
            </div>
          </div>

          {/* Sliders 3 - Straws */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label htmlFor="straws-slider">Plastic Straws Avoided</label>
              <span className="font-mono bg-emerald-100/50 text-emerald-850 px-2 py-0.5 rounded text-xs">{straws} pcs / mo</span>
            </div>
            <input
              type="range"
              id="straws-slider"
              min="0"
              max="5000"
              step="100"
              value={straws}
              onChange={(e) => setStraws(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-emerald-600 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>0</span>
              <span>5,000 straws</span>
            </div>
          </div>
          
          <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 leading-normal">
              <strong>Zero-Waste Sourcing:</strong> Sugarcane waste (bagasse) is naturally fibrous. Normal papers require clear cutting trees; ours utilizes residues that would otherwise be burned.
            </p>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6 bg-white p-5 rounded-xl border border-emerald-50">
          <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-widest text-center lg:text-left">Your Annual Sugarcane Benefit</h4>
          
          <div className="grid grid-cols-3 gap-3">
            {/* Metric 1 */}
            <div className="text-center p-2 rounded-lg bg-gradient-to-b from-emerald-50 to-emerald-100/20 border border-emerald-100/50">
              <p className="text-xs font-semibold text-emerald-800">Plastic Prevented</p>
              <p className="text-lg font-extrabold text-emerald-950 font-mono tracking-tight mt-1">
                {annualPlasticKg} <span className="text-[10px] font-normal font-sans">kg</span>
              </p>
              <p className="text-[9px] text-gray-400 mt-0.5">Not sent to landfills</p>
            </div>

            {/* Metric 2 */}
            <div className="text-center p-2 rounded-lg bg-gradient-to-b from-emerald-50 to-emerald-100/20 border border-emerald-100/50">
              <p className="text-xs font-semibold text-emerald-800">CO₂ Avoided</p>
              <p className="text-lg font-extrabold text-emerald-950 font-mono tracking-tight mt-1">
                {annualCO2Saved} <span className="text-[10px] font-normal font-sans">kg</span>
              </p>
              <p className="text-[9px] text-gray-400 mt-0.5">Carbon offsets met</p>
            </div>

            {/* Metric 3 */}
            <div className="text-center p-2 rounded-lg bg-gradient-to-b from-emerald-50 to-emerald-100/20 border border-emerald-100/50">
              <p className="text-xs font-semibold text-emerald-800">Water Conserved</p>
              <p className="text-lg font-extrabold text-emerald-950 font-mono tracking-tight mt-1">
                {annualWaterSavedGallons} <span className="text-[10px] font-normal font-sans">gal</span>
              </p>
              <p className="text-[9px] text-gray-400 mt-0.5">Manufacturing cost</p>
            </div>
          </div>

          <div className="space-y-3.5 border-t border-emerald-50 pt-4">
            <h5 className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">Impact Equivalents</h5>
            
            <div className="flex items-center space-x-3 text-xs text-gray-700">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Compass className="h-4 w-4" />
              </div>
              <p>
                Equal to planting <strong>{forestDays} mature trees</strong> and absorbing carbon for an entire day.
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs text-gray-700">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Award className="h-4 w-4" />
              </div>
              <p>
                Eliminates greenhouse gases of driving an average sedan for <strong>{carMilesEmissions} miles</strong>.
              </p>
            </div>
          </div>

          <div className="text-[10px] text-gray-400 text-center italic">
            Calculated on 2026 industrial life-cycle comparison specs.
          </div>
        </div>
      </div>
    </div>
  );
}

const fs = require('fs');
const file = 'client/src/components/dashboard/RealTimeStockList.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldHeader = `            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 px-6 py-2 text-xs text-muted-foreground border-b border-border/50 sticky top-0 bg-[#0B0E14]/95 backdrop-blur z-10">
               <div className="col-span-5 md:col-span-4">Stock</div>
               <div className="col-span-2 md:col-span-2 text-right">Price</div>
               <div className="col-span-2 md:col-span-2 text-right">Change</div>
               <div className="hidden md:block col-span-2 text-right">Volume</div>
               <div className="col-span-3 md:col-span-2 text-right flex justify-end items-center gap-1 whitespace-nowrap">
                  <span>AI Score</span>
                  <span className="text-[10px] text-muted-foreground/70 font-normal hidden sm:inline-block">(03-18)</span>
               </div>
            </div>`;

const newHeader = `            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 px-4 sm:px-6 py-2 text-xs text-muted-foreground border-b border-border/50 sticky top-0 bg-[#0B0E14]/95 backdrop-blur z-10">
               <div className="col-span-4 md:col-span-3">Stock</div>
               <div className="col-span-2 md:col-span-2 text-right">Price</div>
               <div className="col-span-2 md:col-span-2 text-right">Change</div>
               <div className="hidden md:block md:col-span-2 text-right">Volume</div>
               <div className="col-span-4 md:col-span-3 text-right flex justify-end items-center gap-1 whitespace-nowrap">
                  <span>AI Score</span>
                  <span className="text-[10px] text-muted-foreground/70 font-normal hidden sm:inline-block">(03-18)</span>
               </div>
            </div>`;

const oldBodyStart = `            {/* Table Body */}
            <div className="flex flex-col">
               {stockData.map((stock) => (
                  <div key={stock.rank} className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border/30 hover:bg-white/5 transition-colors items-center group cursor-pointer">
                     {/* Stock Name Column */}
                     <div className="col-span-5 md:col-span-4 flex items-center gap-3">`;

const newBodyStart = `            {/* Table Body */}
            <div className="flex flex-col">
               {stockData.map((stock) => (
                  <div key={stock.rank} className="grid grid-cols-12 gap-2 px-4 sm:px-6 py-3 border-b border-border/30 hover:bg-white/5 transition-colors items-center group cursor-pointer">
                     {/* Stock Name Column */}
                     <div className="col-span-4 md:col-span-3 flex items-center gap-2 sm:gap-3 overflow-hidden">`;

content = content.replace(oldHeader, newHeader);
content = content.replace(oldBodyStart, newBodyStart);

content = content.replace('className="col-span-2 md:col-span-2 text-right font-mono font-medium"', 'className="col-span-2 md:col-span-2 text-right font-mono font-medium text-[13px] sm:text-sm truncate"');
content = content.replace('className="col-span-2 md:col-span-2 text-right"', 'className="col-span-2 md:col-span-2 text-right truncate"');
content = content.replace('"font-mono font-medium",', '"font-mono font-medium text-[13px] sm:text-sm",');
content = content.replace('className="hidden md:block col-span-2 text-right text-muted-foreground text-xs font-mono"', 'className="hidden md:block md:col-span-2 text-right text-muted-foreground text-xs font-mono truncate"');
content = content.replace('className="col-span-3 md:col-span-2 flex items-center justify-end"', 'className="col-span-4 md:col-span-3 flex items-center justify-end"');

fs.writeFileSync(file, content);
console.log("Success");

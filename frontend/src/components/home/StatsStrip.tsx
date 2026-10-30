import { motion } from "framer-motion";
import { SectionTransition } from "../motion/SectionTransition";

const stats = [
  { value: "₹180 Cr+", label: "Ecosystem Portfolio Valuation", color: "#163A7A", hoverColor: "#0F2A5C" },
  { value: "6", label: "Operating Enterprises", color: "#00B8D9", hoverColor: "#009bb8" },
  { value: "150+", label: "Completed Projects & Deployments", color: "#F54900", hoverColor: "#d99500" },
  { value: "100%", label: "Founder-Led & Sovereign", color: "#15966B", hoverColor: "#0f7252" },
];

export function StatsStrip() {
  return (
    <SectionTransition>
      <section className="relative overflow-hidden bg-[#FAF9F6] py-6 md:py-9">
        <div className="container-x relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-cursor="card"
                className="group flex flex-col items-start lg:items-center text-left lg:text-center border-l lg:border-l-0 lg:border-r last:border-r-0 border-[#E3E5EF] pl-5 lg:pl-0 lg:px-6 cursor-pointer"
              >
                <span
                  className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight transition-transform duration-300 group-hover:scale-106"
                  style={{ color: item.color }}
                >
                  {item.value}
                </span>
                <span className="mt-2 font-sans text-[10.5px] uppercase tracking-[0.22em] text-[#596579] group-hover:text-[#111827] transition-colors max-w-[200px]">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}

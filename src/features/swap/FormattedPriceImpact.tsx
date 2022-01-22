import { ONE_BIPS } from "../../constants";
import { Percent } from "@sushiswap/sdk";
import React from "react";
import { warningSeverity } from "../../functions/prices";

const SEVERITY = {
  0: "text-green",
  1: "text-high-emphesis",
  2: "text-yellow",
  3: "text-red",
  4: "text-red",
};

export default function FormattedPriceImpact({
  priceImpact,
}: {
  priceImpact?: string;
}) {
  
  return (
    <div
      className={`text-sm font-bold `}
      style={{ color: "72BF65"}}
    >
      {priceImpact}
    </div>
  );
}

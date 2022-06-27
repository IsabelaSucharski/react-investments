import { useEffect, useState } from "react";
import { allInvestments } from "../data/investments";
import Reports from "./Reports";

export default function Investments() {
  const [investments, setInvestiments] = useState([]);
  const [reports, setReports] = useState([]);
  const [reportsByInvestments, setReportsByInvestments] = useState([]);

  useEffect(() => {
    const listInvestments = allInvestments.investments.map((i) => {
      return i;
    });

    const listReports = allInvestments.reports.map((r) => {
      return r;
    });

    setInvestiments(listInvestments);
    setReports(listReports);
  }, []);

  return (
    <div>
      {investments.map((i) => {
        return (
          <div className="border border-black mb-4 block">
            <h5 className="font-bold text-lg text-center">{i.description}</h5>
            <Reports>{i}</Reports>
          </div>
        );
      })}
    </div>
  );
}

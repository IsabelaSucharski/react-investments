import { useEffect, useState } from "react";
import { allInvestments } from "../data/investments";

export default function Reports({ children: investment = [] }) {
  const [reports, setReports] = useState([]);
  const [totalRendimento, setTotalRendimento] = useState(0);
  const [totalPorcentagem, setTotalPorcentagem] = useState(0);

  useEffect(() => {
    const listReports = allInvestments.reports.map((r) => {
      return r;
    });

    setReports(listReports);
  }, []);

  let investments = reports.filter(({ investmentId }) =>
    investmentId.includes(investment.id)
  );

  new Map(
    investments.sort((a, b) =>
      a.month > b.month ? 1 : a.month < b.month ? -1 : 0
    )
  );

  const porcentagemTotal = (valor1, valor2) => {
    let por = 0;
   por = (valor1 / valor2  - 1) * 100
    setTotalPorcentagem(por);
  };

  useEffect(() => {
    let valor1 = 0;
    let valor2 = 0;

    investments.map((i) => {
      if (i.month === 12) {
        valor1 = i.value;
      }
      if (i.month === 1) {
        valor2 = i.value;
      }
    });
    porcentagemTotal(valor1, valor2);
    const valortotal = valor1 - valor2;

    setTotalRendimento(valortotal);
  }, [investments]);

  const monthExtenso = (month) => {
    let arrMeses = [
      "",
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ];

    return arrMeses[month];
  };

  const porcentagemMes = (index) => {
    let arrInv = Object.values(investments);
    let i = 1;

    for (i; i <= index; i++) {
      let num1 = arrInv[index].value;
      let num2 = arrInv[index - 1].value;
      let por = 0;

      if (index === 0) {
        por = 0;
      }

      if (num1 > num2) {
        por = +((num1 - num2) / num2) * 100;
      } else {
        por = -((num2 - num1) / num1) * 100;
      }

      return por;
    }
  };

  return (
    <>
      <p className="text-center">
        Rendimento total: R${parseFloat(totalRendimento).toFixed(2)} (
        {parseFloat(totalPorcentagem).toFixed(2)}%)
      </p>
      {investments.map((i, index) => {
        let porc = porcentagemMes(index);
        let mes = monthExtenso(i.month);
        return (
          <div className="flex justify-between">
            <div className="inline-flex">
              <div>
                {mes}/{i.year}
              </div>
              <div className="ml-4">R${parseFloat(i.value).toFixed(2)}</div>
            </div>
            <div className={porc < 0 ? "text-red-600" : "text-green-600"}>
              {parseFloat(porc).toFixed(2)}%
            </div>
          </div>
        );
      })}
    </>
  );
}

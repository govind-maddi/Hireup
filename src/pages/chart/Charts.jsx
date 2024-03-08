/* eslint-disable react/prop-types */
import Chart from "react-google-charts";

const Charts = ({data,title,options}) => {
  return (
    <div>
      <h1>
        <u>{title}</u>
      </h1>
      <div className="chart">
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"250px"}
        />
      </div>
    </div>
  );
}

export default Charts
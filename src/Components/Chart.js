import { PieChart, Pie, Cell, Bar, BarChart, XAxis, YAxis, Legend } from "recharts"
import "./../App.css"
export default function Chart (props) {
    const employees_array = props.values;

    function dataSetFormation (title, array){
        const uniqueValues = new Set();
        // [unique value]: count array
        const data = []; 
        
        // select unique values
        array.forEach(element => { 
            uniqueValues.add(element[title])  
        });
        
        // push count of unique values 
        uniqueValues.forEach((value, index) => { 
            const count = employees_array.filter (current => current[title] == value).length;
            data.push({
                "value": value, 
                "count": count
            });
        })
        
        return {"title": title, "data": data}
    }

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

    const pieChartData = dataSetFormation("jobTitle", employees_array);
    const barChartData = dataSetFormation("gender", employees_array);    

    return (<div className="chart_section">

        <PieChart width={400} height={350}>
            <Pie
                data={pieChartData.data}
                cx={170}
                cy={170}
                labelLine={true}
                outerRadius={80}
                fill="red"
                dataKey="count"
                label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value,
                    index
                  }) => {
                    const RADIAN = Math.PI / 180;
                    // eslint-disable-next-line
                    const radius = 25 + innerRadius + (outerRadius - innerRadius);
                    // eslint-disable-next-line
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    // eslint-disable-next-line
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    
                    // add title to chart
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="darkBlue"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {pieChartData.data[index].value} ({value})
                      </text>
                    );
                  }}
            >
            {/* set different color for each part of chart */}
            {pieChartData.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))} 
            </Pie>
        </PieChart>



        <BarChart width={400} height={360} data={barChartData.data}  >
            <XAxis dataKey="value" />
            <YAxis dataKey="count" />
            <Bar dataKey="count" 
                 fill="#8884d8"
                 isAnimationActive = {true}
                 cx = {50}
                 cy = {50}
            />
        </BarChart>

    </div>)
}
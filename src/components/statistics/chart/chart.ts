import { GoogleCharts } from 'google-charts';
import { IDayStatistic, IStatistics, State } from '../../../modules/types';

export default function getChart(state: State) {
  const chartDiv = document.createElement('div') as HTMLElement;
  chartDiv.className = 'chart';

  function drawChart() {
    const data = new GoogleCharts.api.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Новых слов');
    data.addColumn('number', 'Всего изучено');

    const mydata = (<IStatistics>state.userSettings.statistics).optional.day
      .statistics as IDayStatistic[];

    const myDataRows = [[0, 0, 0]];
    let count = 0;

    mydata.forEach((obj, i) => {
      if (i > 0) {
        count += obj.learned;
      }
      myDataRows.push([i + 1, obj.newWords, count]);
    });

    data.addRows(myDataRows);
    const options = {
      hAxis: {
        title: 'Дни изучения',
      },
      vAxis: {
        title: 'Количество слов',
        min: 0,
      },
      series: {
        1: { curveType: 'function' },
      },
    };
    const lineChart = new GoogleCharts.api.visualization.LineChart(chartDiv);
    lineChart.draw(data, options);
  }
  GoogleCharts.load(drawChart);

  return chartDiv;
}

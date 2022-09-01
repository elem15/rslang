import '../../../../node_modules/chartist/dist/index.css';
import '../assets/styles/statistic.css';
import '../assets/styles/statistic.scss';
import { BarChart} from 'chartist';

export const drawGraphics = () => {
    
    new BarChart(
        '#chart1',
        {
          labels: [
            'количество новых слов за день',
            'процент правильных ответов',
            'самая длинная серия правильных ответов',
          ],
          series: [
            [5, 4, 3]
          ]
        },
        {
          seriesBarDistance: 30,
          reverseData: true,
          horizontalBars: true,
          axisY: {
            offset: 150
          },
          axisX: {
            onlyInteger: true,
          }
        }
      );

      new BarChart(
        '#chart2',
        {
          labels: [
            'количество новых слов за день',
            'количество изученных слов за день',
            'процент правильных ответов за день',
          ],
          series: [
            [7, 5, 10]
          ]
        },
        {
            seriesBarDistance: 30,
            reverseData: true,
            horizontalBars: true,
            axisY: {
              offset: 150
            },
            axisX: {
              onlyInteger: true,
            }
        }
      );
}
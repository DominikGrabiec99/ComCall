import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

import { getAllCourse } from '../../../services/firebase';
import Loading from '../../Loading';

const CoursesChart = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [isLoaading, setIsLoading] = useState(true);
  const [arrayForChart, setArrayForChart] = useState([]);

  useEffect(() => {
    async function getCourses() {
      await getAllCourse(setAllCourses, setIsLoading);
    }

    getCourses();

    return () => {
      setAllCourses([]);
      setIsLoading(true);
    };
  }, []);

  useEffect(() => {
    const table = [];

    allCourses.map((course) => {
      table.push({ x: course.users.length, y: `${course.name.slice(0, 20)}...` });

      return null;
    });

    setArrayForChart(table);
  }, [allCourses]);

  if (isLoaading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Bar
        data={{
          datasets: [
            {
              axis: 'y',
              label: 'courses',
              data: arrayForChart,
              backgroundColor: ['rgba(204, 135, 34, 0.2)'],
              borderColor: ['rgba(204, 135, 34, 1)'],
              borderWidth: 1,
              pointRadius: 10,
              pointHoverRadius: 10
            }
          ]
        }}
        height={400}
        width={600}
        options={{
          indexAxis: 'y',
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true
            }
          }
        }}
      />
    </div>
  );
};

export default CoursesChart;
